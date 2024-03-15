export const getAuthToken = () => {
    const jwt = localStorage.getItem('jwt-eimmigrate');
    if (jwt == null || jwt === '') return null;
    return jwt;
};
