type LogoutCallback = () => void;

let logoutCallback: LogoutCallback | null = null;

export const setLogoutCallback = (listener: LogoutCallback) => {
    logoutCallback = listener;
};

export const executeLogoutCallback = () => {
    logoutCallback?.();
};