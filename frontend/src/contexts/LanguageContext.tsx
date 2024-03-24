import React from "react";
import { createLocalStorageWrapper } from "../utilities/storage/createLocalStorageWrapper";



function setupPreferredLanguageStorageWrapper() {
    const key = 'preferredLanguage';
    return createLocalStorageWrapper<string>(key);
}
export type LanguageContextState = {
    language: string;
    locallyStoredLanguage: string;
    setLanguage: (value: string) => void;
};

function tryGetNavigatorUserLanguage() {
    if ('userLanguage' in window.navigator) {
        if (typeof (window.navigator.userLanguage) === 'string') return window.navigator.userLanguage;
    }
}
function getNavigatorLanguage(): string {
    const userLanguage = tryGetNavigatorUserLanguage();
    if (userLanguage == null || userLanguage === '') return window.navigator.language;
    return userLanguage;
}

const preferredLanguageStorageWrapper = setupPreferredLanguageStorageWrapper();
export const LanguageContext = React.createContext<LanguageContextState | undefined>(undefined);

function useInitialLanguageContextStateFactory(): LanguageContextState {
    const browserLanguage = getNavigatorLanguage();
    const _LOCALSTORE_LANGUAGE = preferredLanguageStorageWrapper.tryGet();
    const LOCALSTORE_LANGUAGE = (_LOCALSTORE_LANGUAGE == null || _LOCALSTORE_LANGUAGE === '') ? 'en' : _LOCALSTORE_LANGUAGE;

    const [language, setLanguage] = React.useState(LOCALSTORE_LANGUAGE);
    React.useEffect(() => {
        
        if (LOCALSTORE_LANGUAGE != null) {
            setLanguage(LOCALSTORE_LANGUAGE);
        } 
        else {
            const effective = browserLanguage.split('-')[0];
            setLanguage(effective);
        }
    }, [LOCALSTORE_LANGUAGE, browserLanguage]);

    const changeLanguage = React.useCallback((language: string) => {
        setLanguage(language);
        preferredLanguageStorageWrapper.set(language);
    }, []);

    return {
        language,
        locallyStoredLanguage: LOCALSTORE_LANGUAGE,
        setLanguage: changeLanguage,
    };
}
export function useLanguageContext() {
    const context = React.useContext(LanguageContext);
    if (context == null) throw new Error(`Must be used within a 'LanguageContext' context.`);
    return context;
}

type LanguageContextProviderProps = {
    children: React.ReactNode;
};
export function LanguageContextProvider(props: LanguageContextProviderProps) {
    const {
        children,
    } = props;
    const context = useInitialLanguageContextStateFactory();
    return (
        <LanguageContext.Provider value={context}>
            {children}
        </LanguageContext.Provider>
    );
}