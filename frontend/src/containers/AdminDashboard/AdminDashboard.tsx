/* eslint-disable no-multiple-empty-lines */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { sendRequest } from '../../sendRequest/sendRequest';
import { apiUrls } from '../../sendRequest/apiUrls';
import { getAuthToken } from '../../utilities/auth_utils';
import { workshopTitle } from '../../data/LanguageOptions';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Button } from '../../components/Button/Button';
import { replaceSlug, slugPair } from '../../utilities/slugs/replaceSlug';
import { downloadUri } from '../../utilities/downloader/downloadUri';
import { ResponsesTable } from './ResponsesTable';
import { isAgencyObject, isValueTranslatedYes } from './helpers';
import { questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire } from './constants';
import { LoadingIndicator } from './LoadingIndicator';
import { QuestionnaireResponseElement } from './types';
import { AgencyOverview } from './AgencyOverview';
import { FlagOverview } from './FlagOverview';

import './AdminDashboard.css';
import { DEFAULT_LANGUAGE } from '../../utilities/languages/constants';
import { useLanguageQuestionHook } from '../../hooks/useLanguageQuestionHook';



const GenerateExcelResponseSchema = z.object({
    id: z.string(),
});



export function AdminDashboard() {
    const navigate = useNavigate();
    const [questionnaireResponses, setQuestionnaireResponses] = React.useState<Array<QuestionnaireResponseElement>>([]);
    const [loading, setLoading] = React.useState(true);
    const [filterBy, setFilterBy] = React.useState('full_name');
    const [searchTerm, setSearchTerm] = React.useState('');

    const {
        questions,
    } = useLanguageQuestionHook({
        title: workshopTitle,
        language: DEFAULT_LANGUAGE,
    });

    React.useEffect(() => {
        async function inner() {
            setLoading(true);
            const jwt = getAuthToken();
            if (jwt === null) {
                navigate('/login');
                return;
            }
            else {
                const response = await sendRequest<{
                    responses: Array<QuestionnaireResponseElement>;
                }>({
                    url: apiUrls.getAllQuestionnaireResponse,
                }, {
                    includeAuth: true,
                });
                const { responses = [] } = response;
                const updatedResponses = responses
                    .map((item) => {
                        const { questionnaireResponse = {} } = item;
                        const newFlag = (item.flagOverride ?? false)
                            ? item.flag
                            : Object.entries(questionnaireResponse).reduce(
                                (acc, stuff) => {
                                    const [key, value] = stuff;
                                    return !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
                                        key,
                                    )
                                        ? isValueTranslatedYes(value)
                                        // ? isValueYes(value)
                                            ? true
                                            : acc
                                        : acc;
                                },
                                false,
                            );
                        return {
                            ...item,
                            selected: false,
                            flag: newFlag,
                        };
                    })
                    .sort((itemA, itemB) => {
                        if (isAgencyObject(itemA) && isAgencyObject(itemB)) {
                            return itemA.agency > itemB.agency ? 1 : -1;
                        }
                        return -1;
                    });
                setLoading(false);
                setQuestionnaireResponses(updatedResponses);
            }
        }
        void inner();
    }, [navigate]);


    const sendEmailsToUsers = React.useCallback(async () => {
        setLoading(true);
        try {

            const response = await sendRequest({
                url: apiUrls.emailQuestionnaireResponse,
                method: 'POST',
                body: JSON.stringify({
                    responsesToEmail: [],
                }),
            }, {
                includeAuth: true,
            });
            console.log('emails sent?', response);
            setLoading(false);
            window.location.reload();
        }
        catch (errors) {
            console.log(
                'send emails to users failed errors is',
                JSON.stringify(errors),
            );
        }
        finally {
            setLoading(false);
        }

       
    }, []);
    
    const getReportById = React.useCallback(async (id: string) => {
        setLoading(false);
        const uri = replaceSlug(apiUrls.getReportById, [
            slugPair(':id', id),
        ]);
        await downloadUri({
            uri, 
            filename: 'ResponsesExcel.xlsx',
            auth: true,
        });
    }, []);

    const downloadLatestResponsesExcel = React.useCallback(async () => {
        setLoading(true);
        try {
            const response = await sendRequest({
                url: apiUrls.generateResponsesExcel,
                method: 'POST',
                body: JSON.stringify({
                    questions,
                    responses: [],
                    downloadAll: false,
                }),
            }, {
                includeAuth: true,
            });
            const excelResponse = GenerateExcelResponseSchema.parse(response);
            await getReportById(excelResponse.id);
        }
        catch (errors) {
            console.log(
                'Error writing the exel sheet',
                JSON.stringify(errors),
            );
            alert(
                'Error writing the exel sheet please contact administrator.',
            );
        }
    }, [getReportById, questions]);
    const downloadAllResponsesExcel = React.useCallback(async () => {
       
        const bodyRaw = {
            questions,
            responses: [],
            downloadAll: true,
        };
        try {
            const response = await sendRequest({
                url: apiUrls.generateResponsesExcel,
                method: 'POST',
                body: JSON.stringify(bodyRaw),
            }, {
                includeAuth: true,
            });

            const excelResponse = GenerateExcelResponseSchema.parse(response);
            await getReportById(excelResponse.id);
        }
        catch (errors) {
            console.log(
                'Error writing the exel sheet',
                JSON.stringify(errors),
            );
            alert(
                'Error writing the exel sheet please contact administrator.',
            );
        }
    }, [getReportById, questions]);

    

    return (
        <section>
            <Navbar
                dashboard={true}
            />
            <section className="AdminDashboard">
                <LoadingIndicator loading={loading}/>
                <section className="overview-container">
                    <article>
                        <h2 className="dashboard-section-title">Overview</h2>
                        <div className="dashboard-card">
                            <FlagOverview questionnaireResponses={questionnaireResponses}/>
                        </div>
                    </article>
                    <article>
                        <h2 className="dashboard-section-title">By Agency</h2>
                        <div className="dashboard-card">
                            <AgencyOverview questionnaireResponses={questionnaireResponses} />
                        </div>
                    </article>
                </section>
                <section className="dashboard-buttons-container">
                    <Button label="Send Email" onClick={sendEmailsToUsers} />
                    <Button
                        label="Download Latest Excel"
                        onClick={downloadLatestResponsesExcel} />
                    <Button
                        label="Download All Excel"
                        onClick={downloadAllResponsesExcel} />
                </section>
                <section></section>
                <section className="dashboard-section-title">
                    <input
                        placeholder="Search"
                        className="input-box"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        name="name" />
                    <select
                        className="dropdown-select"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        name="cars"
                        id="cars"
                    >
                        <option value="full_name">Name</option>
                        <option value="email">Email</option>
                        <option value="mobile_phone">Phone</option>
                        <option value="US_zipcode">Zip</option>
                    </select>
                </section>
                <section>
                    <h2 className="dashboard-section-title">Details</h2>
                    <ResponsesTable
                        filterBy={filterBy}
                        searchTerm={searchTerm}
                        setLoading={setLoading}
                    />
                </section>
            </section>
        </section>
    );
}
