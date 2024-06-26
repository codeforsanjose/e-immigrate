import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useContentContext, ContentContext } from "../../contexts/ContentContext";

type RequiredErrorProps = {
    message: string;
};
export function RequiredErrorDiv(props: RequiredErrorProps) {
    const {
        message,
    } = props;
    return (
        <div className="RequiredError">*{message}</div>
    );
}

type AutoRequiredErrorDivProps = {
    show: boolean;
};

/**
 * Depends on {@link ContentContext}
 * @export
 */
export function AutoRequiredErrorDiv(props: AutoRequiredErrorDivProps) {
    const { content } = useContentContext();
    const {
        show = false,
    } = props;

    if (show) {
        return (
            <RequiredErrorDiv 
                message={content.errorMessage}
            />
        );
    }
    else {
        return null;
    }
    
}
export function RequiredErrorSpan(props: RequiredErrorProps) {
    const {
        message,
    } = props;
    return (
        <span className="RequiredError">*{message}</span>
    );
}
/**
 * Depends on {@link ContentContext}
 * @export
 */
export function AutoRequiredErrorSpan() {
    const { content } = useContentContext();
    return (
        <RequiredErrorSpan 
            message={content.errorMessage}
        />
    );
}