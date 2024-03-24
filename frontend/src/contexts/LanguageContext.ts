import React from "react";
import { getFromStorage, saveToStorage } from "../utilities/storage_utils";

function setupPreferredLanguageStorageWrapper() {
    const key = 'preferredLanguage';
    return {
        tryGet: (): string | undefined => {
            const output = getFromStorage<string>(key);
            if (output == null) return;
            else if (!output.success) {
                console.error('Failed to deserialize the value');
                return;
            }
            return output.value;
        },
        set: (value: string) => {
            saveToStorage(key, value);
        },
    };
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
export function useInitialLanguageContextStateFactory(): LanguageContextState {
    const browserLanguage = getNavigatorLanguage();
    const _LOCALSTORE_LANGUAGE = preferredLanguageStorageWrapper.tryGet();
    const LOCALSTORE_LANGUAGE = (_LOCALSTORE_LANGUAGE == null || _LOCALSTORE_LANGUAGE === '') ? 'en' : _LOCALSTORE_LANGUAGE;

    const [language, setLanguage] = React.useState(LOCALSTORE_LANGUAGE);

    React.useEffect(() => {
        console.log({
            browserLanguage,
            locallyStoredLanguage: LOCALSTORE_LANGUAGE,
            language,
        });
    }, [LOCALSTORE_LANGUAGE, browserLanguage, language]);
    React.useEffect(() => {
        
        if (LOCALSTORE_LANGUAGE != null) {
            // const effective = LOCALSTORE_LANGUAGE.slice(1, -1);
            // console.log('a', { effective, LOCALSTORE_LANGUAGE });
            setLanguage(LOCALSTORE_LANGUAGE);
        } 
        else {
            const effective = browserLanguage.split('-')[0];
            console.log('b', { effective });
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