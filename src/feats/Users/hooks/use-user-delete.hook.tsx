import { useContext } from "react";
import { CreateUserContext } from "../../../contexts/userContext";

export function useUserDelete() {
  const { users, setUsers } = useContext(CreateUserContext)!;
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  return { handleDelete };
}
