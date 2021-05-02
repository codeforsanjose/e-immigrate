import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';

// source : https://gist.github.com/silkyfray/d46babf96c792ef99d09e38ed0ca583a
import 'bulma-calendar/dist/css/bulma-calendar.min.css';

const Question3 = ({
    q,
    bindField,
    setShowModal,
    date,
    setDate,
    content,
    collectAnswer,
}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    useEffect(() => {
        // Initialize all input of date type.
        const calendars = bulmaCalendar.attach('[type="date"]', {
            maxDate: new Date(),
            closeOnSelect: true,
            toggleOnInputClick: true,
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
        const element = document.querySelector('#date-selection');
        if (element) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            element.bulmaCalendar.on('select', (datepicker) => {
                if (q) {
                    collectAnswer(q.slug, datepicker.data.value());
                    setShowModal(true);
                }
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
        const calendarMarkup = <input id="date-selection" type="date" />;
        const bulmaCssCalendar = (
            <div className="bulma-calendar-container">
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
