import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../utils/toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔔 reminder toggle (frontend state)
  const [reminder, setReminder] = useState(false);
  const [reminderIn, setReminderIn] = useState("");

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


  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("protask-token");
      const savedUser = localStorage.getItem("protask-user");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      setToken(savedToken);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      await verifyToken(savedToken);
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (user?.remindersEnabled !== undefined) {
      setReminder(user.remindersEnabled);
    }
    if (user?.reminderIn !== undefined) {
      setReminderIn(user.reminderIn);
    }
  }, [user]);

  const postSetReminderIn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/set-reminder",
        {
          email:user.email, reminderIn
        }
      );

      if (!res.data.success) {
        errorToast("Failed to update reminder");
      }
    } catch (error) {
      errorToast("Something went wrong");
    }
  };
  const postSetReminder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/reminder",
        {
          email:user.email, isReminder:reminder
        }
      );

      if (!res.data.success) {
        errorToast("Failed to update reminder");
      }
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  // ===============================
  // Trigger API when reminder changes
  // ===============================
  useEffect(() => {
    if (!loading && user) {
      postSetReminder();
    }
  }, [reminder]);
  useEffect(() => {
    if (!loading && user) {
      postSetReminderIn();
    }
  }, [reminderIn]);

  // ===============================
  // Set auth data after login
  // ===============================
  const setAuthData = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("protask-user", JSON.stringify(userData));
    localStorage.setItem("protask-token", jwtToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  };

  // ===============================
  // Logout
  // ===============================
  const logout = () => {
    setUser(null);
    setToken(null);
    setReminder(false);

    localStorage.removeItem("protask-user");
    localStorage.removeItem("protask-token");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        reminder,
        reminderIn,
        setReminderIn,
        setReminder,
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
