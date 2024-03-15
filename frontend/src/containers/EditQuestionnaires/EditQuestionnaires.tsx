import React from 'react';
import { apis } from '../../sendRequest/apis';

import { sendRequest } from '../../sendRequest/sendRequest';
import { getAuthToken } from '../../utilities/auth_utils';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { Button } from '../../components/Button/Button';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';
import './EditQuestionnaires.css';
const {
    uploadQuestinnaires,
    getQuestionsByLanguage,
    getQuestions,
    deleteQuestionnaireByTitle,
} = apis;
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
    const [chooseFile, toggleChooseFile] = React.useState(false);
    const [questionnaireStatus, setQuestionnaireStatus] = React.useState<boolean | string>(false);
    const [questionnaires, setQuestionnaires] = React.useState<Array<QuestionnaireElement>>([]);
    const [titleList, setTitleList] = React.useState<Array<string | undefined>>([]);
    const [questionnaireTitle, setTitle] = React.useState('');
    const [getQuestionCall, callGetQuestions] = React.useState(false);
    const [fetchQuestionnaire, setFetchQuestionnaire] = React.useState(false);
    const [languageDropdown, toggleLanguageDropDown] = React.useState(false);
    const [language, setLanguage] = React.useState('en');
    const [questions, setListOfQuestions] = React.useState<Array<GetQuestionsByLanguageElement>>([]);
    const [reFetch, setRefetch] = React.useState(false);
    const [workshopTitle, setWorkshopTitle] = React.useState('');

    const content = { buttonHome: 'Home' };
    const setToggleChooseFile = () => {
        if (chooseFile) {
            toggleChooseFile(false);
        }
        else {
            toggleChooseFile(true);
        }
    };
    const softDeleteResponse = (title: string) => {
        const confirmBox = window.confirm(
            'Do you really want to delete this questionnaire response?',
        );
        if (!confirmBox) {
            return;
        }

        const requestObj = {
            url: deleteQuestionnaireByTitle.replace(
                ':title',
                encodeURIComponent(title),
            ),
            method: 'DELETE',
        };
        const jwt = getAuthToken();
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        sendRequest(requestObj, headers)
            .then((response) => {
                setRefetch(true);
            })
            .catch((err) => {
                console.log(
                    `error soft-deleting questionnaire response ${title}`,
                    err,
                );
            });
    };
    const changeLanguage = (language: string) => {
        setLanguage(language);
        toggleLanguageDropDown(false);
        callGetQuestions(true);
    };
    const getByLanguage = () => {
        toggleLanguageDropDown(true);
        const encodedTitle = encodeURIComponent(questionnaireTitle);
        const requestObj = {
            url: getQuestionsByLanguage
                .replace(':title', encodedTitle)
                .replace(':language', language),
            method: 'GET',
        };
        sendRequest<GetQuestionsByLanguageApiResponse>(requestObj)
            .then((response) => {
                console.log(response);
                setListOfQuestions(response.questions);
            })
            .catch((error) => console.log(error));
    };
    if (getQuestionCall) {
        getByLanguage();
        callGetQuestions(false);
    }
    React.useEffect(() => {
        if (fetchQuestionnaire || (questionnaires.length > 0 && !reFetch)) {
            return;
        }
        else {
            const requestObj = {
                url: getQuestions,
                method: 'GET',
            };
            setFetchQuestionnaire(true);
            sendRequest<GetQuestionsApiResponse>(requestObj)
                .then((response) => {
                    const objs = response.responses;
                    const newArray = [];
                    setQuestionnaires(objs);
                    const titles = Array.from(new Set(objs.map((obj) => obj.title)));
                    setTitleList(titles);
                    setFetchQuestionnaire(false);
                    setRefetch(false);
                })
                .catch(() => {
                    setFetchQuestionnaire(false);
                });
        }
    }, [fetchQuestionnaire, questionnaires.length, reFetch]);
    const uploadNewQuestionnaire = (qustionnaireFile: File | undefined) => {
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
            url: uploadQuestinnaires,
            method: 'POST',
            body: formData,
        };
        setQuestionnaireStatus('Uploading ' + qustionnaireFile.name);
        sendRequest(requestObj, headers, true)
            .then((response) => {
                setQuestionnaireStatus('Uploaded ' + qustionnaireFile.name);
                setRefetch(true);

                setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
                setToggleChooseFile();
            })
            .catch(() => {
                setQuestionnaireStatus(
                    'Error! Upload of ' + qustionnaireFile.name + ' failed',
                );

                setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
                setToggleChooseFile();
            });
    };
    const selectLanguage = (title: string) => {
        toggleLanguageDropDown(true);
        setTitle(title);
        changeLanguage('en');
    };
    const switchViews = () => {
        toggleLanguageDropDown(false);
        setListOfQuestions([]);
    };

    return (
        <section>
            <Navbar
                content={content}
                dashboard={true}
                language={language}
                setLanguage={setLanguage}
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
                                onChange={(e) =>
                                    uploadNewQuestionnaire(e.target.files?.[0])
                                }
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
                                            onClick={(e) => softDeleteResponse(title)}
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
