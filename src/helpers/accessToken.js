let accessToken = "";

export const setAccessToken = (newAccessToken) => {
    accessToken = newAccessToken;
};

export const getAccessToken = () => {
    return accessToken;
};