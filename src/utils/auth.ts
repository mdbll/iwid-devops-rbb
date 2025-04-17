// src/utils/auth.ts

export function isAuthenticated(): boolean {
    const tokenKey = Object.keys(localStorage).find((key) =>
        /^CognitoIdentityServiceProvider\..*\.accessToken$/.test(key)
    );
    return !!(tokenKey && localStorage.getItem(tokenKey));
}
