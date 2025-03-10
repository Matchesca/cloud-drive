import clsx from "clsx";
import React from "react";
import * as motion from "motion/react-client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "muted" | "outline" | "destructive";
}

// Custom class to have different types of buttons
const variantClasses: Record<string, string> = {
  primary: "bg-violet-500 text-white",
  secondary: "border-[1px] border-black/10 bg-white text-black",
  ghost: "text-black border-none",
  outline: "border border-black",
  destructive: "",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full"
      >
        <button
          className={clsx(
            "inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[12px] px-4 disabled:opacity-50",
            variantClasses[variant],
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      </motion.div>
    );
  },
);

Button.displayName = "Button";

export default Button;
