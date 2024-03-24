import React from 'react';
import { QuestionnaireResponseElement } from './types';
type FlagOverviewProps = {
    questionnaireResponses: Array<QuestionnaireResponseElement>;
};
export function FlagOverview(props: FlagOverviewProps) {
    const {
        questionnaireResponses,
    } = props;
    return (
        <div className="flag-dashboard-card">
            <h4>Responses</h4>
            <div>
                <span>Red:</span>
                <span className="text-red bold">
                    {questionnaireResponses.filter(
                        (response) => response.flag === true,
                    ).length}
                </span>
            </div>
            <div>
                Green:{' '}
                <span className="text-green bold">
                    {questionnaireResponses.filter(
                        (response) => response.flag === false,
                    ).length}
                </span>
            </div>
            <div>
                Total:{' '}
                <span className="bold">
                    {questionnaireResponses.length}
                </span>
            </div>
        </div>
    );
}
