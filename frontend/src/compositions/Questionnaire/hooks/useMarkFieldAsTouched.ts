import React from 'react';
import { BindFieldFunction } from '../../../types/common';
import { WithPersist } from '../../../types/WithPreventDefault';
type TouchedFields = {
    all: boolean;
} & Record<string, boolean>;

export function useMarkFieldAsTouched() {
    const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({ all: false });
    const setFieldAsTouched = (event: WithPersist & { target: { name: string, }, }) => {
        event.persist();
        setTouchedFields((prevState) => ({
            ...prevState,
            [event.target.name]: true,
        }));
    };

    const setAllFieldsTouched = () => {
        setTouchedFields({ all: true });
    };

    const bindField: BindFieldFunction = (name: string) => ({
        'data-touched': touchedFields.all || touchedFields[name],
        onBlur: setFieldAsTouched,
    });

    return {
        bindField,
        setAllFieldsTouched,
    };
}
