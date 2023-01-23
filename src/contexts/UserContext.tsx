import { createContext, ReactNode } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
const UserContext = createContext<any | undefined>(undefined);
export default UserContext;

export function UserProvider({ children }: ChildrenProps) {
  const [userData, setUserData, deleteUserData] = useLocalStorage("userData", {});

  return <UserContext.Provider value={{ userData, setUserData, deleteUserData }}>{children}</UserContext.Provider>;
}

interface ChildrenProps {
  children: ReactNode;
}
