import React from 'react';
import Button from '../../components/Button/Button';
import { enUS } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';

import 'react-nice-dates/build/style.css';

const Question3 = ({
    q,
    bindField,
    setQuestion3,
    setShowModal,
    date,
    setDate,
    addResponse,
}) => {
    if (q) {
        return (
            <div className="DatePicker">
                <div className="QuestionText">{q.text}</div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setShowModal(true);
                        const formData = new FormData(event.target);
                        const data = Object.fromEntries(formData.entries());
                        setQuestion3(data[q.slug]);
                        addResponse(q.slug, data[q.slug]);
                    }}
                >
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                        locale={enUS}
                    >
                        {({ inputProps, focused }) => (
                            <input
                                type="date"
                                name={q.slug}
                                required={q.required}
                                {...bindField(q.slug)}
                                className={
                                    ('input' + (focused ? ' -focused' : ''),
                                    'TextInput')
                                }
                                {...inputProps}
                            />
                        )}
                    </DatePicker>
                    <div className="RequiredError">*This field is required</div>
                    <Button type="submit" label={'Submit'} />
                </form>
            </div>
        );
    } else {
        return null;
    }
};

export default Question3;
