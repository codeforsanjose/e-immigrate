import React from 'react';
import { QuestionnaireResponseElement } from './types';
import { AGENCIES } from './constants';
type AgencyOverviewProps = {
    questionnaireResponses: Array<QuestionnaireResponseElement>;
};
export function AgencyOverview(props: AgencyOverviewProps) {
    const {
        questionnaireResponses,
    } = props;
    return (
        <div className="agency-dashboard-card">
            <h4>Assigned to</h4>
            <div className="agency-grid">
                {AGENCIES.map((agency, idx) => {
                    const responsesForAgency = questionnaireResponses.filter(response => response.agency === agency);
                    return (
                        <div key={idx} className="agency-row">
                            <div>{agency}</div>
                            <div className="sum text-red bold">
                                {responsesForAgency.filter(response => response.flag === true).length}
                            </div>
                            <div className="sum text-green bold">
                                {responsesForAgency.filter(response => response.flag === false).length}
                            </div>
                            <div className="sum bold">
                                {responsesForAgency.length}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
