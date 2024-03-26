type UserLanguageNavigator = Navigator & {
    userLanguage?: Navigator['language'];
};
function isNavigatorWithUserLanguage(navigator: Navigator): navigator is UserLanguageNavigator {
    if (!('userLanguage' in window.navigator)) return false;
    return typeof window.navigator.userLanguage === 'string';
}
function tryGetNavigatorUserLanguage() {
    if (!isNavigatorWithUserLanguage(window.navigator)) return;
    return window.navigator.userLanguage;
}

export function getNavigatorLanguage(): string {
    const userLanguage = tryGetNavigatorUserLanguage();
    if (userLanguage == null || userLanguage === '') return window.navigator.language;
    return userLanguage;
}