import React from 'react';
import { apiUrls } from '../../sendRequest/apiUrls';

import { sendRequest } from '../../sendRequest/sendRequest';
import { Navbar } from '../../compositions/Navbar/Navbar';
import { LanguageDropdown } from '../../components/LanguageDropdown/LanguageDropdown';
import './EditQuestionnaires.css';

import { apiUrlFormatters } from '../../sendRequest/apiUrlFormatters';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { DEFAULT_LANGUAGE } from '../../utilities/languages/constants';
import { api } from '../../sendRequest/api';
import { useLanguageQuestionHook } from '../../hooks/useLanguageQuestionHook';
import { useSelectableTitle } from './useSelectableTitle';
import { ChooseFileSection } from './ChooseFileSection';
import classNames from 'classnames';

type QuestionnaireElement = {
    title: string | undefined;
};
type GetQuestionsApiResponse = {
    responses: Array<QuestionnaireElement>;
};

function OptionalSelectedTitle(props: {
    selected?: string;
}) {
    const { selected } = props;
    if (selected == null || selected === '') return null;
    return (
        <div>Selected title: {selected}</div>
    );
}

export function EditQuestionnaires() {
    const {
        language, 
        setLanguage,
    } = useLanguageContext();

  
    const [questionnaireStatus, setQuestionnaireStatus] = React.useState<boolean | string>(false);
    const [questionnaires, setQuestionnaires] = React.useState<Array<QuestionnaireElement>>([]);
    const [fetchQuestionnaire, setFetchQuestionnaire] = React.useState(false);
    const [reFetch, setReFetch] = React.useState(false);
    const [workshopTitle, setWorkshopTitle] = React.useState('');
  
    const {
        setTitleList,
        titleList,
        selectedTitle,
        setSelectedTitle,
    } = useSelectableTitle();

    const softDeleteResponse = React.useCallback(async (title: string) => {
        const message = `Do you really want to delete this '${title}' questionnaire?`;
        const confirmBox = window.confirm(message);
        if (!confirmBox) return;

        try {
            await sendRequest({
                url: apiUrlFormatters.deleteQuestionnaireByTitle({
                    title,
                }),
                method: 'DELETE',
            }, {
                includeAuth: true,
            });
            if (selectedTitle === title) {
                if (titleList.length === 0) setSelectedTitle(undefined);
                else setSelectedTitle(titleList[0]);
                //
            }
            setReFetch(true);
        }
        catch (err) {
            console.log(
                `error soft-deleting ${title} questionnaire `,
                err,
            );
        }
    }, [selectedTitle, setSelectedTitle, titleList]);
    

    const {
        questions,
        setQuestions,
    } = useLanguageQuestionHook({
        title: selectedTitle,
        language,
    });


    const changeLanguage = React.useCallback(async (language: string) => {
        setLanguage(language);
        // setLanguageDropdown(false);
        // setLanguageDropdown(true);
        const result = await api.getQuestionsByLanguage({
            title: selectedTitle,
            language,
        });
        if (result == null) return;
        setQuestions(result.questions);
    }, [selectedTitle, setLanguage, setQuestions]);

    React.useEffect(() => {
        async function inner() {
            if (fetchQuestionnaire) return;
            else if (questionnaires.length > 0 && !reFetch) return;

            setFetchQuestionnaire(true);
            try {

                const response = await sendRequest<GetQuestionsApiResponse>({
                    url: apiUrls.getQuestions,
                    method: 'GET',
                });
                const questionnaires = response.responses;
                setQuestionnaires(questionnaires);
                const cleanTitles = questionnaires.map(q => q.title).filter(t => t != null && t !== '') as Array<string>;
                setTitleList(Array.from(new Set(cleanTitles)));
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setFetchQuestionnaire(false);
                setReFetch(false);
            }
        }
        void inner();
    }, [fetchQuestionnaire, questionnaires.length, reFetch, setTitleList]);

    const selectLanguage = React.useCallback((title: string) => {
        // setLanguageDropdown(true);
        setSelectedTitle(title);
        changeLanguage(DEFAULT_LANGUAGE);
    }, [changeLanguage, setSelectedTitle]);
    
    return (
        <section>
            <Navbar
                dashboard={true}
            />
            <section>
                <ChooseFileSection 
                    setQuestionnaireStatus={setQuestionnaireStatus}
                    setRefetch={setReFetch}
                    setWorkshopTitle={setWorkshopTitle}
                    workshopTitle={workshopTitle}
                />
            </section>
            <section>{`questionnaireStatus: ${questionnaireStatus ?? ''}`}</section>
            <section>
                <LanguageDropdown
                    setLanguage={changeLanguage}
                    language={language}
                ></LanguageDropdown>
            </section>
            <section>
                <ul className='TitleList'>
                    {titleList.map((title) => {
                        if (title == null) return null;
                        return (
                            <li 
                                key={title} 
                                className={classNames('TitleList_Item', {
                                    ActiveTitle: title === selectedTitle,
                                    InactiveTitle: title !== selectedTitle,
                                })}
                            >
                                <span className='TitleList_Title'>{title}</span>
                                <button className='TitleList_View' onClick={() => selectLanguage(title)}>
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
                <OptionalSelectedTitle selected={selectedTitle} />
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
}
