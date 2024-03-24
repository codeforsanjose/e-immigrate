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
import { useQuestionnaireResponseContent } from '../../contexts/QuestionnaireResponseContext';
// const yearsRange = () => {
//     const years = [];
//     for (let i = 1900; i < 2023; i++) {
//         years.push(i);
//     }
//     return years;
// };
// const daysRange = () => {
//     const days = [];
//     for (let i = 1; i <= 31; i++) {
//         days.push(i);
//     }
//     return days;
// };
// const monthsRange = () => {
//     const months = [];
//     for (let i = 1; i <= 12; i++) {
//         months.push(i);
//     }
//     return months;
// };
type Question3Props = QuestionProps & {
    setShowModal: (value: boolean) => void;
    date: number | Date;
    setDate: (value: number | Date) => void;
    showModal: boolean;
    // bindField: QuestionProps['bindField'];
    // content: {
    //     errorMessage: string;
    //     screeningProceedButton: string;
    // }; 
    // collectAnswer: CollectAnswerFunction;
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
    } = useQuestionnaireResponseContent();
    // const [day, setDay] = React.useState(1);
    // const [month, setMonth] = React.useState(1);
    // const [year, setYear] = React.useState(1);

    React.useEffect(() => {
        // Initialize all input of date type.
        // TS-CHANGE NOTE: bulmaCalendar doesnt support a maxDate of a string
        // const maxDate = new Date().toLocaleDateString();
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
            // calendar.on('date:selected', (date) => {
            //     console.log(date);
            // });
        });

        // To access to bulmaCalendar instance of an element
        // eslint-disable-next-line no-undef
        
        const element = document.querySelector('#date-selection');
        const calendar = tryGetBulmaCalendar(element);
        if (calendar != null) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            calendar.on('select', (datepicker) => {
                const value = datepicker.data.value();
                const selectedDate = new Date(value.startDate);
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
    const bulmaCssCalendar = (
        <div className="bulma-calendar-container is-mobile">
            <input id="date-selection" type="date" />
            <AutoRequiredErrorDiv />
            <Button
                type="submit"
                label={content.screeningProceedButton}
                onClick={onClick} />
        </div>
    );

    // const selectDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const value = e.target.value;
    //     setDay(parseInt(value));
    // };
    // const selectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const value = e.target.value;
    //     setMonth(parseInt(value));
    // };
    // const selectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const value = e.target.value;
    //     setYear(parseInt(value));
    // };
    // const daysOptions = daysRange().map((item, index) => {
    //     return (
    //         <option key={`day-option-${index}`} value={item}>
    //             {item}
    //         </option>
    //     );
    // });
    // const monthsOptions = monthsRange().map((item, index) => {
    //     return (
    //         <option key={`month-option-${index}`} value={item}>
    //             {item}
    //         </option>
    //     );
    // });
    // const yearsOptions = yearsRange().map((item, index) => {
    //     return (
    //         <option key={`year-option-${index}`} value={item}>
    //             {item}
    //         </option>
    //     );
    // });
    // const simpleCalendarContainer = (
    //     <section className="simple-calendar-container">
    //         <h3>Format: dd/mm/yyyy</h3>
    //         <h4>
    //             {day} / {month} / {year}
    //         </h4>
    //         <section className="day-selection">
    //             <label>
    //                 Day: <select onChange={selectDay}>{daysOptions}</select>
    //             </label>
    //         </section>
    //         <section className="month-selection">
    //             <label>
    //                 Month:{' '}
    //                 <select onChange={selectMonth}>{monthsOptions}</select>
    //             </label>
    //         </section>
    //         <section className="year-selection">
    //             <label>
    //                 Year:
    //                 <select onChange={selectYear}>{yearsOptions}</select>
    //             </label>
    //         </section>
    //         <button onClick={onClick}>{`--->`}</button>
    //     </section>
    // );
    return (
        <div className="DatePicker">
            <div className="QuestionText">{q.text}</div>
            {bulmaCssCalendar}
        </div>
    );
}
