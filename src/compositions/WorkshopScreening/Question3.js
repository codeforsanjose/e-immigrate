import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';

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
    if (q) {
        const onClick = (e) => {
            e.preventDefault();
            collectAnswer(
                q.slug,
                date && format(date, 'MM/dd/yyyy', { locale: enUS })
            );
            setShowModal(true);
        };
        return (
            <div className="DatePicker">
                <div className="QuestionText">{q.text}</div>
                <div>
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
                    <div className="RequiredError">*{content.errorMessage}</div>
                    <Button
                        type="submit"
                        label={content.screeningProceedButton}
                        onClick={onClick}
                    />
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Question3;
