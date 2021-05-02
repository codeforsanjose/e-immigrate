import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';

import 'bulma-calendar/dist/css/bulma-calendar.min.css';

import 'react-nice-dates/build/style.css';

const Question3 = ({
    q,
    bindField,
    setShowModal,
    date,
    setDate,
    content,
    collectAnswer,
}) => {
    const showCalendar = useState(false);
    useEffect(() => {
        // Initialize all input of date type.
        const calendars = bulmaCalendar.attach('[type="date"]', {
            maxDate: new Date(),
            isRange: false,
            type: 'date',
            enableYearSwitch: true,
            closeOnSelect: true,
            closeOnOverlayClick: true,
        });

        // Loop on each calendar initialized
        calendars.forEach((calendar) => {
            // Add listener to date:selected event
            calendar.on('date:selected', (date) => {
                console.log(date);
            });
        });

        // To access to bulmaCalendar instance of an element
        // eslint-disable-next-line no-undef
        const element = document.querySelector('#dob');
        if (element) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            element.bulmaCalendar.on('select', (datepicker) => {
                collectAnswer(datepicker.data.value());
            });
        }
    }, []);
    if (q) {
        const onClick = (e) => {
            e.preventDefault();
            collectAnswer(
                q.slug,
                date && format(date, 'MM/dd/yyyy', { locale: enUS })
            );
            setShowModal(true);
        };
        const calendarMarkup = showCalendar ? (
            <input id="dob" type="date" />
        ) : null;
        const bulmaCssCalendar = (
            <div className="bulma-calendar-container is-mobile">
                {calendarMarkup}
                <div className="RequiredError">*{content.errorMessage}</div>
                <Button
                    type="submit"
                    label={content.screeningProceedButton}
                    onClick={onClick}
                />
            </div>
        );

        return (
            <div className="DatePicker">
                <div className="QuestionText">{q.text}</div>
                {bulmaCssCalendar}
            </div>
        );
    } else {
        return null;
    }
};

export default Question3;
