import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("loggedIn");
    const adminLogin = localStorage.getItem("adminLoggedIn");
    const userData = localStorage.getItem("user");

    if (data && data !== "undefined") {
      try {
        setLoggedIn(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing loggedIn data:", error);
      }
    }

    if (adminLogin && adminLogin !== "undefined") {
      try {
        setAdminLoggedIn(JSON.parse(adminLogin));
      } catch (error) {
        console.error("Error parsing adminLoggedIn data:", error);
      }
    }

    if (userData && userData !== "undefined") {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        adminLoggedIn,
        setAdminLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
