import React from 'react';

import './MERSReportingPage.css';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { mersWorkshopTitle } from '../../data/LanguageOptions';
import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import { sendRequest } from '../../sendRequest/sendRequest';
import { QuestionnaireResponseElement } from '../AdminDashboard/types';
import { questionnaireResponseAnswersToMarkupArray } from '../AdminDashboard/ResponsesTable';
import { QuestionnaireContainer } from '../../compositions/Questionnaire/Questionnaire/QuestionnaireContainer';

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

    React.useEffect(() => {
        if (mersResults != null) {
            const stuff = questionnaireResponseAnswersToMarkupArray(mersResults?.results, []);
            console.log('the fuck is stuff', stuff);
            setMarkupResults(current => {
                return stuff;
            });
            // allTheAnswers.current = stuff;
        }

    }, [mersResults]);
    console.log('all the asnwersssss', markupResults);
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
                    console.log('response was null', {
                        requestObj,
                    });
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
    console.log('the mers results', mersResults?.results);
    // console.log('allTheAnswers', allTheAnswers);
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
