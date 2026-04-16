import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type ButtonPropsType = {
  isSubmitting: boolean;
  className?: string;
  textValider: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  isSubmitting,
  className,
  children,
  textValider,
  ...rest
}: ButtonPropsType) {
  return (
    <button
      disabled={isSubmitting}
      className={cn(
        "mt-4 bg-indigo-500 text-white cursor-pointer py-2 rounded hover:bg-indigo-600 transition disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {isSubmitting ? textValider : (children ?? textValider)}
    </button>
  );
}
