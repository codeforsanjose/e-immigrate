import React from "react";
import { workshopTitle } from "../../data/LanguageOptions";

function getCurrentTitle(
    titleList: Array<string>, 
    desired: string | undefined,
): string | undefined {
    if (desired == null) return desired;
    if (titleList.includes(desired)) return desired;
    return undefined;
}
type SelectableTitleState = {
    titles: Array<string>;
    currentTitle: string | undefined;
};
type SelectableTitleActions = 
| {
    action: 'clear_titles';
}
| {
    action: 'set_titles';
    titles: Array<string>;
}
| {
    action: 'select_title';
    title: string | undefined;
};
function selectableTitleReducerAction(currentState: SelectableTitleState, action: SelectableTitleActions): SelectableTitleState {
    const actionKey = action.action;
    if (action.action === 'clear_titles') {
        return {
            titles: [],
            currentTitle: undefined,
        };
    }
    else if (action.action === 'set_titles') {
        return {
            titles: [...action.titles],
            currentTitle: getCurrentTitle(action.titles, currentState.currentTitle),
        };
    }
    else if (action.action === 'select_title') {
        const effectiveTitle = getCurrentTitle(currentState.titles, action.title);
        let finalTitle = effectiveTitle;
        if (effectiveTitle == null && action.title != null) {
            if (currentState.titles.includes(action.title)) {
                finalTitle = action.title;
            }
        }
        return {
            titles: currentState.titles,
            currentTitle: finalTitle,
        };
    }
    action satisfies never;
    throw new Error(`Unsupported action ${actionKey}`);
}
export function useSelectableTitle() {
    const [state, dispatch] = React.useReducer(selectableTitleReducerAction, undefined, () => {
        return {
            titles: [],
            currentTitle: workshopTitle,
        } satisfies SelectableTitleState;
    });
    // const [titleList, setTitleList] = React.useState<Array<string>>([]);
    // const [questionnaireTitle, setTitle] = React.useState<string | undefined>(undefined);

    const {
        titles: titleList,
        currentTitle: selectedTitle,
    } = state;
    const setTitleList = React.useCallback((value: Array<string>) => {
        dispatch({
            action: 'set_titles',
            titles: value,
        });
    }, []);
    const setSelectedTitle = React.useCallback((value?: string) => {
        dispatch({
            action: 'select_title',
            title: value,
        });
    }, []);
    return {
        titleList,
        setTitleList,
        selectedTitle, 
        setSelectedTitle,
    };
}