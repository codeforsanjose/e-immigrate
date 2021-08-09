import React, { useState, useEffect, useMemo } from 'react';
import {
    uploadQuestinnaires,
    getQuestionsByLanguage,
    getQuestions,
    deleteQuestionnaireByTitle,
} from '../../sendRequest/apis';
import { sendRequest } from '../../sendRequest/sendRequest';
import { getAuthToken } from '../../utilities/auth_utils';
import Navbar from '../../compositions/Navbar/Navbar';
import Button from '../../components/Button/Button';
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';
import './EditQuestionnaires.css';

const EditQuestionnaires = () => {
    const [chooseFile, toggleChooseFile] = useState(false);
    const [questionnaireStatus, setQuestionnaireStatus] = useState(false);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [titleList, setTitleList] = useState([]);
    const [questionnaireTitle, setTitle] = useState('');
    const [getQuestionCall, callGetQuestions] = useState(false);
    const [fetchQuestionnaire, setFetchQuestionnaire] = useState(false);
    const [languageDropdown, toggleLanguageDropDown] = useState(false);
    const [language, setLanguage] = useState('en');
    const [questions, setListOfQuestions] = useState([]);
    const [reFetch, setRefetch] = useState(false);
    const [workshopTitle, setWorkshopTitle] = useState('');

    const content = { buttonHome: 'Home' };
    const setToggleChooseFile = () => {
        if (chooseFile) {
            toggleChooseFile(false);
        } else {
            toggleChooseFile(true);
        }
    };
    const softDeleteResponse = (title) => {
        const confirmBox = window.confirm(
            'Do you really want to delete this questionnaire response?'
        );
        if (confirmBox === false) {
            return;
        }

        const requestObj = {
            url: deleteQuestionnaireByTitle.replace(
                ':title',
                encodeURIComponent(title)
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
                    err
                );
            });
    };
    const changeLanguage = (language) => {
        setLanguage(language);
        toggleLanguageDropDown(false);
        callGetQuestions(true);
    };
    const getByLanguage = () => {
        toggleLanguageDropDown(true);
        let encodedTitle = encodeURIComponent(questionnaireTitle);
        const requestObj = {
            url: getQuestionsByLanguage
                .replace(':title', encodedTitle)
                .replace(':language', language),
            method: 'GET',
        };
        sendRequest(requestObj)
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
    useEffect(() => {
        if (fetchQuestionnaire || (questionnaires.length > 0 && !reFetch)) {
            return;
        } else {
            const requestObj = {
                url: getQuestions,
                method: 'GET',
            };
            setFetchQuestionnaire(true);
            sendRequest(requestObj)
                .then((response) => {
                    let objs = response.responses;
                    let newArray = [];
                    setQuestionnaires(objs);
                    let titles = objs.map((obj) => obj.title);
                    titles = [...new Set(titles)];
                    setTitleList(titles);
                    setFetchQuestionnaire(false);
                    setRefetch(false);
                })
                .catch((error) => {
                    setFetchQuestionnaire(false);
                });
        }
    });
    const uploadNewQuestionnaire = (qustionnaireFile) => {
        const formData = new FormData();

        formData.append(
            'questionnaire',
            qustionnaireFile,
            qustionnaireFile.name
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
            .catch((error) => {
                setQuestionnaireStatus(
                    'Error! Upload of ' + qustionnaireFile.name + ' failed'
                );

                setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
                setToggleChooseFile();
            });
    };
    const selectLanguage = (title) => {
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
            <Navbar content={content} dashboard={true} />
            <section>
                {chooseFile ? (
                    <form>
                        <label>WorkshopTitle</label>
                        <input
                            onChange={(e) => setWorkshopTitle(e.target.value)}
                            required
                            type="text"
                        ></input>
                        <br></br>
                        <input
                            disabled={!workshopTitle}
                            required
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={(e) =>
                                uploadNewQuestionnaire(e.target.files[0])
                            }
                        />
                    </form>
                ) : (
                    <Button
                        label="Upload New Questionnaire"
                        onClick={setToggleChooseFile}
                    />
                )}
            </section>
            <section>{questionnaireStatus ? questionnaireStatus : ''}</section>

            <section>
                {languageDropdown ? (
                    <section>
                        <button onClick={switchViews}>Back</button>
                        <LanguageDropdown
                            setLanguage={(lang) => changeLanguage(lang)}
                            language={language}
                        ></LanguageDropdown>
                    </section>
                ) : (
                    <ul>
                        {titleList.map((title) => (
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
                        ))}
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
export default EditQuestionnaires;
