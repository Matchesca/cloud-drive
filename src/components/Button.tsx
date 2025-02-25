interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="rounded-[12px] bg-black p-2 text-white" {...rest}>
      {children}
    </button>
  );
};

export default Button;
