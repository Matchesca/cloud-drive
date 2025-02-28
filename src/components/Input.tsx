import clsx from "clsx";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "flex h-10 w-full rounded-[12px] border border-black/10 px-3 placeholder:text-gray-500 disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
