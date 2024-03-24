import React from 'react';
import { useHasEligibilityResponses } from '../../hooks/stageTesters';
import { Navigate } from 'react-router-dom';

type NavigateToEligibilityIfMissingProps = {
    disable?: boolean;
};
/**
 *  If there are no eligibility questions filled out, 
 * navigate to the eligibility form.
 *
 * @export
 * @param {NavigateToEligibilityIfMissingProps} props
 */
export function NavigateToEligibilityIfMissing(props: NavigateToEligibilityIfMissingProps) {
    const {
        disable = true,
    } = props;
    const hasStage0 = useHasEligibilityResponses();
    if (hasStage0) return null;
    else if (disable) return null;
    return <Navigate to={'/eligibility'} />;
}
