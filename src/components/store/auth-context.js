import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password, collage) => {}
});

export const AuthContextProvide = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storeUserInfo = localStorage.getItem("iAmInside");
    console.log("i am in app");
    if (storeUserInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("iAmInside");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("iAmInside", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
