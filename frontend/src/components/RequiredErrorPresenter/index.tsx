import React from "react";
import { useContentContext } from "../../contexts/ContentContext";

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
export function AutoRequiredErrorDiv() {
    const { content } = useContentContext();
    return (
        <RequiredErrorDiv 
            message={content.errorMessage}
        />
    );
}
export function RequiredErrorSpan(props: RequiredErrorProps) {
    const {
        message,
    } = props;
    return (
        <span className="RequiredError">*{message}</span>
    );
}
export function AutoRequiredErrorSpan() {
    const { content } = useContentContext();
    return (
        <RequiredErrorSpan 
            message={content.errorMessage}
        />
    );
}