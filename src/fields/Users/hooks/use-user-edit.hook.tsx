import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CreateUserContext } from "../../../contexts/userContext";
import type { User } from "../../../types/types";

export function useUserEdit() {
  const context = useContext(CreateUserContext)!;

  const { setUsers } = context;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<User>({ mode: "onChange" });

  const handleEdit = (id: number, data: Omit<User, "id">) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...data } : user)),
    );
    reset();
  };

  return {
    handleEdit,
    register,
    handleSubmit,
    reset,
    isSubmitting,
    errors,
  };
}
