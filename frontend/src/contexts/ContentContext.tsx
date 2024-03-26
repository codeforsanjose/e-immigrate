import React from "react";
import { ContentText, missingContentText } from "../types/ContentText";
import { LanguageContextState, useLanguageContext } from "./LanguageContext";
import { workshopTitle } from "../data/LanguageOptions";
import { createLocalStorageWrapper } from "../utilities/storage/createLocalStorageWrapper";


type ContentContextState = {
    content: ContentText;
    setContent: (value: ContentText) => void;
};
export const ContentContext = React.createContext<ContentContextState | undefined>(undefined);


function useInitialContentContextStateFactory(languageContext: LanguageContextState) {
    const { language } = languageContext;
    const localStoreContentWrapper = React.useMemo(() => {
        return createLocalStorageWrapper<ContentText>(`${workshopTitle}-content-${language}`);
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

type ContentContextProviderProps = {
    children: React.ReactNode;
};
export function ContentContextProvider(props: ContentContextProviderProps) {
    const {
        children,
    } = props;
    const languageContext = useLanguageContext();
    const context = useInitialContentContextStateFactory(languageContext);
    return (
        <ContentContext.Provider value={context}>
            {children}
        </ContentContext.Provider>
    );
}