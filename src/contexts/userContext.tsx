import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import type { User } from "../types/types";

type ContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};
export const CreateUserContext = createContext<ContextType | null>(null);
export function UserContextProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <CreateUserContext.Provider value={{ users, setUsers }}>
      {children}
    </CreateUserContext.Provider>
  );
}
