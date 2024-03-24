import React from "react";
import { ContentText, missingContentText } from "../types/ContentText";
import { LanguageContextState } from "./LanguageContext";
import { workshopTitle } from "../data/LanguageOptions";
import { getFromStorage, saveToStorage } from "../utilities/storage_utils";


type ContentContextState = {
    content: ContentText;
    setContent: (value: ContentText) => void;
};
export const ContentContext = React.createContext<ContentContextState | undefined>(undefined);

function setupLocalstoreContentWrapper(language: string) {
    const key = `${workshopTitle}-content-${language}`;
    
    return {
        tryGet: (): ContentText | undefined => {
            const output = getFromStorage<ContentText>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value;
        },
        set: (value: ContentText) => {
            saveToStorage(key, value);
        },
    };
}
export function useInitialContentContextStateFactory(languageContext: LanguageContextState) {
    const { language } = languageContext;
    const localStoreContentWrapper = React.useMemo(() => {
        return setupLocalstoreContentWrapper(language);
    }, [language]);
    const LOCALSTORE_CONTENT = localStoreContentWrapper.tryGet() ?? {
        ...(missingContentText),
    };
    const [content, setContent] = React.useState(LOCALSTORE_CONTENT);
    const setContentWrapped = React.useCallback((content: ContentText) => {
        setContent(content);
        localStoreContentWrapper.set(content);
    }, [localStoreContentWrapper]);
    return {
        content,
        setContent: setContentWrapped,
    };
}
export function useContentContext() {
    const context = React.useContext(ContentContext);
    if (context == null) throw new Error(`Must be used within a 'ContentContext' context.`);
    return context;
}