import React from 'react';
import { apis } from '../../sendRequest/apis';

import { sendRequest } from '../../sendRequest/sendRequest';
import { getAuthToken } from '../../utilities/auth_utils';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Button } from '../../components/Button/Button';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';
import './EditQuestionnaires.css';

import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import { useLanguageContext } from '../../contexts/LanguageContext';

type QuestionnaireElement = {
    title: string | undefined;
};
type GetQuestionsApiResponse = {
    responses: Array<QuestionnaireElement>;
};
type GetQuestionsByLanguageElement = {
    id: string;
    text: string;
};
type GetQuestionsByLanguageApiResponse = {
    questions: Array<GetQuestionsByLanguageElement>;
};
export const EditQuestionnaires = () => {
    const {
        language,
        setLanguage,
    } = useLanguageContext();
    const [chooseFile, toggleChooseFile] = React.useState(false);
    const [questionnaireStatus, setQuestionnaireStatus] = React.useState<boolean | string>(false);
    const [questionnaires, setQuestionnaires] = React.useState<Array<QuestionnaireElement>>([]);
    const [titleList, setTitleList] = React.useState<Array<string | undefined>>([]);
    const [questionnaireTitle, setTitle] = React.useState('');
    const [getQuestionCall, callGetQuestions] = React.useState(false);
    const [fetchQuestionnaire, setFetchQuestionnaire] = React.useState(false);
    const [languageDropdown, toggleLanguageDropDown] = React.useState(false);
    // const [language, setLanguage] = React.useState('en');
    const [questions, setListOfQuestions] = React.useState<Array<GetQuestionsByLanguageElement>>([]);
    const [reFetch, setRefetch] = React.useState(false);
    const [workshopTitle, setWorkshopTitle] = React.useState('');

  
    const setToggleChooseFile = React.useCallback(() => {
        toggleChooseFile(cur => !cur);
    }, []);
    const softDeleteResponse = React.useCallback(async (title: string) => {
        const confirmBox = window.confirm(
            'Do you really want to delete this questionnaire response?',
        );
        if (!confirmBox) {
            return;
        }

        const requestObj = {
            url: apiUrlFormatters.deleteQuestionnaireByTitle({
                title,
            }),
            method: 'DELETE',
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        try {
            await sendRequest(requestObj, headers);
            setRefetch(true);
        }
        catch (err) {
            console.log(
                `error soft-deleting questionnaire response ${title}`,
                err,
            );
        }
    }, []);
    const changeLanguage = React.useCallback((language: string) => {
        setLanguage(language);
        toggleLanguageDropDown(false);
        callGetQuestions(true);
    }, [setLanguage]);
    const getByLanguage = React.useCallback(async () => {
        toggleLanguageDropDown(true);
        const encodedTitle = encodeURIComponent(questionnaireTitle);
        const requestObj = {
            url: apiUrlFormatters.getQuestionsByLanguage({
                title: encodedTitle,
                language,
            }),
            method: 'GET',
        };
        try {
            const response = await sendRequest<GetQuestionsByLanguageApiResponse>(requestObj);
            console.log(response);
            setListOfQuestions(response.questions);
        }
        catch (error) {
            console.log(error);
        }
    }, [language, questionnaireTitle]);
    if (getQuestionCall) {
        getByLanguage();
        callGetQuestions(false);
    }
    React.useEffect(() => {
        async function inner() {
            if (fetchQuestionnaire || (questionnaires.length > 0 && !reFetch)) {
                return;
            }
            else {
                const requestObj = {
                    url: apis.getQuestions,
                    method: 'GET',
                };
                setFetchQuestionnaire(true);
                try {

                    const response = await sendRequest<GetQuestionsApiResponse>(requestObj);
                    const objs = response.responses;
                    setQuestionnaires(objs);
                    const titles = Array.from(new Set(objs.map((obj) => obj.title)));
                    setTitleList(titles);
                    setFetchQuestionnaire(false);
                    setRefetch(false);
                }
                catch (err) {
                    setFetchQuestionnaire(false);
                }
            }
        }
        void inner();
    }, [fetchQuestionnaire, questionnaires.length, reFetch]);
    const uploadNewQuestionnaire = React.useCallback(async (qustionnaireFile: File | undefined) => {
        if (qustionnaireFile == null) {
            console.error('No file selected');
            return;
        }
        const formData = new FormData();

        formData.append(
            'questionnaire',
            qustionnaireFile,
            qustionnaireFile.name,
        );
        formData.append('title', workshopTitle);
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };

        const requestObj = {
            url: apis.uploadQuestinnaires,
            method: 'POST',
            body: formData,
        };
        setQuestionnaireStatus('Uploading ' + qustionnaireFile.name);
        try {
            await sendRequest(requestObj, headers, true);
            setQuestionnaireStatus('Uploaded ' + qustionnaireFile.name);
            setRefetch(true);

            setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
            setToggleChooseFile();
        }
        catch {
            setQuestionnaireStatus(`Error! Upload of ${qustionnaireFile.name} failed`);
            setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
            setToggleChooseFile();
        }
    }, [setToggleChooseFile, workshopTitle]);

    const selectLanguage = React.useCallback((title: string) => {
        toggleLanguageDropDown(true);
        setTitle(title);
        changeLanguage('en');
    }, [changeLanguage]);
    const switchViews = React.useCallback(() => {
        toggleLanguageDropDown(false);
        setListOfQuestions([]);
    }, []);

    return (
        <section>
            <Navbar
                dashboard={true}
            />
            <section>
                {chooseFile
                    ? (
                        <form>
                            <label>WorkshopTitle</label>
                            <input
                                onChange={(e) => setWorkshopTitle(e.target.value)}
                                required
                                type="text"
                            ></input>
                            <br></br>
                            <input
                                disabled={workshopTitle == null || workshopTitle === ''}
                                required
                                type="file"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={async e => await uploadNewQuestionnaire(e.target.files?.[0])}
                            />
                        </form>
                    )
                    : (
                        <Button
                            label="Upload New Questionnaire"
                            onClick={setToggleChooseFile}
                        />
                    )}
            </section>
            <section>{`${questionnaireStatus ?? ''}`}</section>

            <section>
                {languageDropdown
                    ? (
                        <section>
                            <button onClick={switchViews}>Back</button>
                            <LanguageDropdown
                                setLanguage={(lang) => changeLanguage(lang)}
                                language={language}
                            ></LanguageDropdown>
                        </section>
                    )
                    : (
                        <ul>
                            {titleList.map((title) => {
                                if (title == null) return null;
                                return (
                                    <li key={title}>
                                        {title}
                                        <button onClick={() => selectLanguage(title)}>
                                        View
                                        </button>
                                        <div
                                            title="Delete this response"
                                            className="delete"
                                            onClick={async () => await softDeleteResponse(title)}
                                        ></div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                <div>{questionnaireTitle}</div>
                <ul>
                    {questions.map((q) => (
                        <li key={q.id}>
                            {q.id}. {q.text}
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
};
