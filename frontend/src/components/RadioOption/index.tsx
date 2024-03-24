import React from 'react';
import { CommonComponentProps } from '../../types/CommonComponentProps';
import { AutoRequiredErrorSpan } from '../RequiredErrorPresenter';
import { useQuestionnaireResponseContent } from '../../contexts/QuestionnaireResponseContext';
type RadioOptionProps = CommonComponentProps & {
    option: string;
    value: string;
    /**
     *  If specified, this will be invoked _AFTER_ the answer has been collected.
     *
     */
    onChange?: () => void;
};
export function RadioOption(props: RadioOptionProps) {
    const {
        q,
        option,
        value,
        onChange: userOnChange,
    } = props;
    const { 
        collectAnswer,
        bindField,
    } = useQuestionnaireResponseContent();
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        collectAnswer(q.slug, e.target.value);
        userOnChange?.();
    }, [collectAnswer, userOnChange, q.slug]);
    return (
        <div >
            <label className="Radio">
                <span className="RadioInput">
                    <input
                        type="radio"
                        id={`${q.slug}-${option}`}
                        name={q.slug}
                        required={q.required}
                        value={value}
                        className="RadioButton"
                        {...bindField(q.slug)}
                        onChange={onChange}
                    />
                    <span className="RadioControl"></span>
                </span>
                <span className="RadioLabel">{option}</span>
            </label>
            <AutoRequiredErrorSpan />
        </div>
    );
}