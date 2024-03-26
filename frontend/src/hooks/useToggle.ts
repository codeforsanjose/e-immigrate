import React from "react";

export function useToggle(initial = false) {
    const [value, setValue] = React.useState(initial);
    return {
        value,
        setValue: React.useCallback((state?: boolean) => {
            setValue(current => {
                return state ?? !current;
            });
        }, []),
        toggleValue: React.useCallback(() => {
            setValue(current => !current);
        }, []),
    };
}