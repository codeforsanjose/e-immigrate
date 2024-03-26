import React from 'react';
type QuestionnaireContainerProps = {
    children: React.ReactNode;
};
export function QuestionnaireContainer(props: QuestionnaireContainerProps) {
    const {
        children,
    } = props;
    return (
        <div className='Questionnaire'>
            {children}
        </div>
    );
}