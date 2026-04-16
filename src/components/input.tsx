import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { cn } from "../lib/utils";
import type { User } from "../types/types";

type InputPropsType = {
  name: keyof User;
  register: UseFormRegister<User>;
  rules?: RegisterOptions<User>;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  type,
  name,
  register,
  rules,
  className,
  ...rest
}: InputPropsType) {
  return (
    <input
      type={type}
      className={cn(
        "border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
        className,
      )}
      {...register(name, rules)}
      {...rest}
    />
  );
}
