import { useFrappeAuth, useFrappeGetDoc, useSWRConfig } from "frappe-react-sdk";
import { createContext, useState, useContext, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initialState);
  const { login, logout, currentUser } = useFrappeAuth();

  const { mutate } = useSWRConfig();

  const { data, error, isValidating } = useFrappeGetDoc("User", currentUser);
  // console.log("auth rerender", currentUser);
  useEffect(() => {
    if (data) {
      setAuth({
        user: data,
      });
    }
  }, [data]);

  useEffect(() => {
    // console.log("current user:", currentUser);
    setAuth({
      isAuthenticated: !!currentUser,
      user: currentUser ? auth.user : null,
    });
    // mutate();
  }, [currentUser, auth.user]);

  // console.log(auth, currentUser);

  const handleLogout = async () => {
    await logout();
    mutate(() => true, undefined, false);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ ...auth, currentUser, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};
