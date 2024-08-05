"use client";

interface ColorSizeStockProps {
  color: string;
  size: string;
  stock: number;
}

const ColorSizeStock: React.FC<ColorSizeStockProps> = ({
  color,
  size,
  stock,
}) => {
  return (
    <div className="px-1 flex justify-center items-center gap-4">
      <div
        style={{ backgroundColor: color }}
        className=" rounded-full w-9 h-9"
      ></div>
      <div className="h-9 w-9 border rounded text-zinc-800 flex items-center justify-center text-sm">{size.toUpperCase()}</div>
      <div className="h-9 w-9 border rounded text-zinc-800 flex items-center justify-center text-sm">{stock}</div>
    </div>
  );
};

export default ColorSizeStock;
