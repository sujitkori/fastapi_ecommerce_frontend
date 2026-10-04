import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LoginResponse } from "../features/auth/types/auth.types";
import { clearTokens, getAccessToken, saveToken } from "../utils/tokenStorage";
import { setLogoutCallback } from "../utils/authEvents";
import type { UserProfileResponse } from "../features/auth/types/user.types";
import { getProfile } from "../features/auth/services/userService";


interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfileResponse | null;
  isProfileLoading: boolean;

  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessToken(),
  );
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(
  () => getAccessToken() !== null
);

  const login = useCallback((loginResponse: LoginResponse) => {
    saveToken(loginResponse);
    setAccessToken(loginResponse.access_token);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = accessToken !== null;

  useEffect(() => {
  const fetchProfile = async () => {
    if (!accessToken) {
      // console.log("No access token");
      setUser(null);
      return;
    }

    // console.log("Fetching profile...");

    setIsProfileLoading(true);

    try {
      const profile = await getProfile();

      // console.log("Profile response:", profile);

      setUser(profile);
    } catch (error) {
      console.log("Profile failed:", error);
      logout();
    } finally {
      setIsProfileLoading(false);
    }
  };

  fetchProfile();
}, [accessToken, logout]);

  useEffect(() => {
    setLogoutCallback(logout);
  }, [logout]); // Because React's Hooks rule says: Every value used inside an effect should appear in the dependency array.

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isProfileLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
