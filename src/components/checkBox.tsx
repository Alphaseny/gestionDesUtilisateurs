import type { UseFormRegister } from "react-hook-form";
import type { User } from "../types/types";

type CheckBoxPropsType = {
  name: keyof User;
  className?: string;
  register: UseFormRegister<User>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CheckBox({
  register,
  name,
  className,
  ...rest
}: CheckBoxPropsType) {
  return (
    <input
      type="checkbox"
      className={className}
      {...register(name)}
      {...rest}
    />
  );
}
