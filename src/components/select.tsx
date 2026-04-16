import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { cn } from "../lib/utils";
import type { User } from "../types/types";

type SelectPropsType = {
  name: keyof User;
  className?: string;
  optionText: string;
  options: string[];
  register: UseFormRegister<User>;
  rules?: RegisterOptions<User>;
};

export function Select({
  name,
  className,
  optionText,
  options,
  register,
  rules,
}: SelectPropsType) {
  return (
    <select
      className={cn(
        "border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
        className,
      )}
      {...register(name, rules)}
      defaultValue=""
    >
      {/* Placeholder */}
      <option value="" disabled>
        {optionText}
      </option>

      {/* Options */}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
