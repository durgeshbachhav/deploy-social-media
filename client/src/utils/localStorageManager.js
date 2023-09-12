export const KEY_ACCESS_TOKEN = 'access_token';

export const getItem = (key) => {
     return localStorage.getItem(key);
}

export const setItem = (key, value) => {
     return localStorage.setItem(key, value)
}

export const removeItem = (key) => {
     localStorage.removeItem(key);
}

