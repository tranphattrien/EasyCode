import { createContext, useContext, useEffect, useState } from "react";
import { lookInSession } from "../src/common/session";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ user: { access_token: null } });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must used within a UserContextProvider");
  }
  return context;
}
