export const getAuthToken = () => {
    const jwt = localStorage.getItem('jwt-eimmigrate');
    return jwt ? jwt : null;
};
