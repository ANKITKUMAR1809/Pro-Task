import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token with backend
  const verifyToken = async (savedToken) => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/verify-token",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  // Load user + token from localStorage on refresh
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("protask-token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      setToken(savedToken);

      // IMPORTANT: Wait for token verification
      await verifyToken(savedToken);

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Called from login component
  const setAuthData = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("protask-user", JSON.stringify(userData));
    localStorage.setItem("protask-token", jwtToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("protask-user");
    localStorage.removeItem("protask-token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setAuthData,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
