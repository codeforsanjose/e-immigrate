import React from 'react';
import { useNavigate } from 'react-router-dom';

import './MERSReportingPage.css';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { mersWorkshopTitle } from '../../data/LanguageOptions';
import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import { sendRequest } from '../../sendRequest/sendRequest';
import { QuestionnaireResponseElement } from '../AdminDashboard/types';
import { questionnaireResponseAnswersToMarkupArray } from '../AdminDashboard/ResponsesTable';
import { QuestionnaireContainer } from '../../compositions/Questionnaire/Questionnaire/QuestionnaireContainer';
import { getAuthToken } from '../../utilities/auth_utils';

type GetMersQuestionsForIdentifierApiResponse = {
    title?: string;
    results: QuestionnaireResponseElement;
};
export function MERSReportingPage() {
    const [mers, setMers] = React.useState<null | string>(null);
    const [fetchMers, setFetchMers] = React.useState<boolean>(false);
    const [mersResults, setMersResults] = React.useState<null | GetMersQuestionsForIdentifierApiResponse>(null);

    const [markupResults, setMarkupResults] = React.useState<Array<JSX.Element> | null>(null);
    function handleLookup() {
        // test with d782e81c-5802-4637-9d29-ba2546acead0
        setFetchMers(true);
    }
    const navigate = useNavigate();
    React.useEffect(() => {
        async function inner() {
            // setLoading(true);
            const jwt = getAuthToken();
            if (jwt == null) {
                navigate('/');
                return;
            }
        }
        void inner();
    }, [navigate]);
    React.useEffect(() => {
        if (mersResults != null) {
            const stuff = questionnaireResponseAnswersToMarkupArray(mersResults?.results, []);
            setMarkupResults(current => {
                return stuff;
            });
            // allTheAnswers.current = stuff;
        }

    }, [mersResults]);
    React.useEffect(() => {
        async function inner() {
            if (fetchMers) {
                const requestObj = {
                    url: apiUrlFormatters.getMersQuestionsByUniqueId({
                        title: mersWorkshopTitle,
                        uniqueId: mers ?? '',
                    }),
                };
                const response = await sendRequest<GetMersQuestionsForIdentifierApiResponse | undefined>(requestObj, { includeAuth: true });
                if (response == null) {
                    return;
                }
                setMersResults(current => {
                    setFetchMers(false);
                    return response;
                });
            }
        }
        void inner();
    }, [fetchMers, mers]);
    return (
        <div className="MERSReportingPage">
            <Navbar />
            <h2>Participant Entry Lookup:</h2>
            <input
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.preventDefault();
                    setMers(event.target.value);
                }} />
            <button onClick={handleLookup}>Lookup</button>
            <article>
                {mersResults != null && (
                    <div>found em
                        <QuestionnaireContainer>
                            {markupResults}
                        </QuestionnaireContainer>
                    </div>
                )}
            </article>
        </div>
    );
}
