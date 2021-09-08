import React ,{ useState } from "react";

const userContext = React.createContext({
  token: "",
  isLoggedIn: false,
  name: "",
  email: "",
  isMuted: false,
  isBanned: false,
  isAdmin: false,
  login: (token, name, isAdmin, isMuted, isBanned) => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isMuted, setIsMuted] = useState("");
  const [isBanned, setIsBanned] = useState("");

  // const userIsLoggedIn = !!token;
  const userIsLoggedIn = true;

  const loginHandler = (userData) => {
    setToken(userData.token);
    setName(userData.name);
    setEmail(userData.email);
    setIsAdmin(userData.isAdmin);
    setIsMuted(userData.isMuted);
    setIsBanned(userData.isBanned);
  };

  const logoutHandler = () => {
    setToken(null);
    setName("");
    setEmail("");
    setIsAdmin(false);
    setIsMuted(false);
    setIsBanned(false);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    name: name,
    email: email,
    isMuted: isMuted,
    isBanned: isBanned,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;