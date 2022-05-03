import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';

import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';

// source : https://gist.github.com/silkyfray/d46babf96c792ef99d09e38ed0ca583a
import 'bulma-calendar/dist/css/bulma-calendar.min.css';
const yearsRange = () => {
    let years = [];
    for (let i = 1900; i < 2023; i++) {
        years.push(i);
    }
    return years;
};
const daysRange = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }
    return days;
};
const monthsRange = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }
    return months;
};
const Question3 = ({
    q,
    bindField,
    setShowModal,
    date,
    setDate,
    content,
    collectAnswer,
}) => {
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(1);

    useEffect(() => {
        // Initialize all input of date type.
        const maxDate = new Date().toLocaleDateString();
        const calendars = bulmaCalendar.attach('[type="date"]', {
            maxDate: maxDate,
            closeOnSelect: true,
            toggleOnInputClick: true,
            type: 'date',
            showHeader: false,
            showFooter: false,
            dateFormat: 'mm/dd/yyyy',
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
                setDate(new Date(datepicker.data.value()));
            });
        }
    }, []);
    if (q) {
        const onClick = (e) => {
            e.preventDefault();
            const selectedDate = `${month}/${day}/${year}`;
            const selectedDateObject = new Date(selectedDate);

            const isValidDateForWorkship =
                date.getTime() > selectedDateObject.getTime();

            if (date && isValidDateForWorkship) {
                collectAnswer(q.slug, selectedDate);
                setShowModal(true);
            }
        };
        const bulmaCssCalendar = (
            <div className="bulma-calendar-container is-mobile">
                <input id="date-selection" type="date" />
                <div className="RequiredError">*{content.errorMessage}</div>
                <Button
                    type="submit"
                    label={content.screeningProceedButton}
                    onClick={onClick}
                />
            </div>
        );

        const selectDay = (e) => {
            const value = e.target.value;
            setDay(value);
        };
        const selectMonth = (e) => {
            const value = e.target.value;
            setMonth(value);
        };
        const selectYear = (e) => {
            const value = e.target.value;
            setYear(value);
        };
        const daysOptions = daysRange().map((item, index) => {
            return (
                <option key={`day-option-${index}`} value={item}>
                    {item}
                </option>
            );
        });
        const monthsOptions = monthsRange().map((item, index) => {
            return (
                <option key={`month-option-${index}`} value={item}>
                    {item}
                </option>
            );
        });
        const yearsOptions = yearsRange().map((item, index) => {
            return (
                <option key={`year-option-${index}`} value={item}>
                    {item}
                </option>
            );
        });
        const simpleCalendarContainer = (
            <section className="simple-calendar-container">
                <h3>Format: dd/mm/yyyy</h3>
                <h4>
                    {day} / {month} / {year}
                </h4>
                <section className="day-selection">
                    <label>
                        Day: <select onChange={selectDay}>{daysOptions}</select>
                    </label>
                </section>
                <section className="month-selection">
                    <label>
                        Month:{' '}
                        <select onChange={selectMonth}>{monthsOptions}</select>
                    </label>
                </section>
                <section className="year-selection">
                    <label>
                        Year:
                        <select onChange={selectYear}>{yearsOptions}</select>
                    </label>
                </section>
                <button onClick={onClick}>---></button>
            </section>
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
