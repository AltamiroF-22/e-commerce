"use client";

interface ColorProps {
  colorId?: string;
  selectedColor: string;
  colorName?: string;
  handleColorSelection: (colorId: string | undefined, colorName: string| undefined) => void;
}

const Colors: React.FC<ColorProps> = ({
  colorId,
  selectedColor,
  colorName,
  handleColorSelection,
}) => {
  return (
    <label htmlFor={`color-${colorId}`} className="cursor-pointer">
      <input
        type="radio"
        id={`color-${colorId}`}
        value={colorId}
        className="hidden"
        checked={selectedColor === colorId}
        onChange={() => handleColorSelection(colorId, colorName)}
      />
      <div
        style={{ background: `${colorName}` }}
        className={`w-8 h-8 border rounded-full ${
          selectedColor === colorId && "border-blue-600"
        }`}
      ></div>
    </label>
  );
};

export default Colors;
