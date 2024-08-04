interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  label: string;
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type, disable }) => {
  return (
    <button
      disabled={disable}
      type={type}
      onClick={onClick}
      className="w-full m-4 rounded-md text-center py-3 bg-zinc-900 text-white transition hover:opacity-85"
    >
      {label}
    </button>
  );
};

export default Button;
