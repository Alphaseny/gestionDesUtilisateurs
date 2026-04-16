import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CreateUserContext } from "../../../contexts/userContext";
import type { User } from "../../../types/types";
export function useUserAdd() {
  const { users, setUsers } = useContext(CreateUserContext)!;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<User>();

  //  SUBMIT
  const handleAdd = (data: User) => {
    const newData = {
      id: Date.now(),
      nom: data.nom,
      prenom: data.prenom,
      genre: data.genre,
      tel: data.tel,
      centreInteret: data.centreInteret,
    };
    setUsers([...users, newData]);
    reset();
  };
  return { register, handleSubmit, isSubmitting, errors, handleAdd };
}
