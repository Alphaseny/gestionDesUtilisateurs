import { useContext } from "react";
import { CreateUserContext } from "../../../contexts/userContext";
import { useBoolean } from "usehooks-ts";

export function useUserDelete() {
  const { toggle } = useBoolean(false);
  const { users, setUsers } = useContext(CreateUserContext)!;
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  return {handleDelete};
}
