let token = null;

function getToken() {
    return token;
}

function setToken(newToken) {
    token = newToken;
}

function clearToken() {
    token = null;
}

export {
    getToken,
    setToken,
    clearToken
};