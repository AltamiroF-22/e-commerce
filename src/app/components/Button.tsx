interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button
      className="w-full m-4 rounded-md text-center py-3 bg-zinc-900 text-white transition hover:opacity-85"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
