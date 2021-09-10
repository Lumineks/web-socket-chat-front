import React, { useState } from "react";
import colorGenerator from "../utils/colorGenerator";

const userContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  email: "",
  isMuted: false,
  isBanned: false,
  isAdmin: false,
  color: "",
  login: (token, name, isAdmin, isMuted, isBanned) => {},
  logout: () => {},
  setMute: (mute) => {},
  setBan: (ban) => {},
});

export const UserContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isMuted, setIsMuted] = useState("");
  const [isBanned, setIsBanned] = useState("");
  const [color, setColor] = useState("");

  const userIsLoggedIn = !!token;
  // const userIsLoggedIn = true;

  const loginHandler = (userData) => {
    setToken(userData.token);
    setName(userData.name);
    setEmail(userData.email);
    setIsAdmin(userData.isAdmin);
    setIsMuted(userData.isMuted);
    setIsBanned(userData.isBanned);

    const rmColor = colorGenerator();

    setColor(rmColor)
  };

  const logoutHandler = () => {
    setToken(null);
    setName("");
    setEmail("");
    setIsAdmin(false);
    setIsMuted(false);
    setIsBanned(false);
  };

  const handleMute = (mute) => {
    console.log("from context --  ", mute);
    setIsMuted(mute);
  };

  const handleBan = (ban) => {
    setIsBanned(ban);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    name: name,
    email: email,
    isMuted: isMuted,
    isBanned: isBanned,
    isAdmin: isAdmin,
    color: color,
    login: loginHandler,
    logout: logoutHandler,
    setMute: handleMute,
    setBan: handleBan,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
