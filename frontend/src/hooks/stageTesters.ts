import React from "react";
import { useQuestionnaireResponseContext } from "../contexts/QuestionnaireResponseContext";
import { useQuestionsContext } from "../contexts/QuestionsContext";

/**
 *  Returns a value indicating whether any of the eligibility 
 * questions were completed
 * 
 *
 * @export
 */
export function useHasEligibilityResponses(): boolean {
    const { questions } = useQuestionsContext();
    const {
        questionnaireResponse,
    } = useQuestionnaireResponseContext();
    const responsePairs = React.useMemo(() => {
        return questions.filter(q => q.category === 'Workshop Eligibility').map(q => {
            return {
                question: q,
                response: questionnaireResponse[q.slug],
            };
        });
    }, [questions, questionnaireResponse]);

    return React.useMemo(() => {
        const nonEmpty = responsePairs.filter(pair => pair.response != null);
        // const flatResponses = nonEmpty.map(pair => `${pair.question.slug}:${pair.response as string}`);
        // const stageResponse = flatResponses.join(',');    
        return nonEmpty.length > 0;
    }, [responsePairs]);
}