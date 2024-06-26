import React from 'react';
import { Button } from '../../components/Button/Button';

// import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';
import bulmaCalendar from 'bulma-calendar';

// source : https://gist.github.com/silkyfray/d46babf96c792ef99d09e38ed0ca583a
import 'bulma-calendar/dist/css/bulma-calendar.min.css';
import { QuestionProps } from './QuestionTypes';
import { WithPreventDefault } from "../../types/WithPreventDefault";
import { useContentContext } from '../../contexts/ContentContext';
import { AutoRequiredErrorDiv } from '../../components/RequiredErrorPresenter';
import { useQuestionnaireResponseContext } from '../../contexts/QuestionnaireResponseContext';

type Question3Props = QuestionProps & {
    setShowModal: (value: boolean) => void;
    date: number | Date;
    setDate: (value: number | Date) => void;
    showModal: boolean;

};
function tryGetBulmaCalendar(element?: Element | null | undefined): bulmaCalendar | undefined {
    if (element == null) return;
    if (!('bulmaCalendar' in element)) return;
    return element.bulmaCalendar as bulmaCalendar;
}
export function Question3(props: Question3Props) {
    const {
        q, 
        setShowModal, 
        date, 
        setDate, 
    } = props;
    const { content } = useContentContext();
    const { 
        collectAnswer,
        questionnaireResponse,
    } = useQuestionnaireResponseContext();

    React.useEffect(() => {
        // Initialize all input of date type.
        const maxDate = new Date();
        
        const calendars = bulmaCalendar.attach('[type="date"]', {
            maxDate,
            closeOnSelect: true,
            toggleOnInputClick: true,
            type: 'date',
            showHeader: false,
            showFooter: false,
        });

        // Loop on each calendar initialized
        calendars.forEach((calendar) => {
            // Add listener to date:selected event
            calendar.on('select', (date) => {
                console.log(date);
            });
        });

        // To access to bulmaCalendar instance of an element
        const element = document.querySelector('#date-selection');
        const calendar = tryGetBulmaCalendar(element);
        if (calendar != null) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            calendar.on('select', (datepicker) => {
                const value = datepicker.data.value();
                // @ts-expect-error date takes in this string just fine
                const selectedDate = new Date(value);
                setDate(selectedDate);
            });
        }
    }, [setDate]);
    if (q == null) return null;
    const onClick = (e: WithPreventDefault) => {
        e.preventDefault();
        if (date != null) {
            collectAnswer(q.slug, date);
            setShowModal(true);
        }
    };
    const valueForSlug = questionnaireResponse[q.slug];
    const showError = valueForSlug == null || valueForSlug === '';
    const bulmaCssCalendar = (
        <div className="bulma-calendar-container is-mobile">
            <input id="date-selection" type="date" />
            <AutoRequiredErrorDiv show={showError} />
            <Button
                type="submit"
                label={content.screeningProceedButton}
                onClick={onClick} />
        </div>
    );

    return (
        <div className="DatePicker">
            <div className="QuestionText">{q.text}</div>
            {bulmaCssCalendar}
        </div>
    );
}
