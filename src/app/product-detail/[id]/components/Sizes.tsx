"use client";

interface SizesProps {
  sizeId: string;
  sizeName: string;
  selectedSize: string;
  handleSizeSelection: (sizeId: string, sizeName: string) => void;
}

const Sizes: React.FC<SizesProps> = ({
  sizeId,
  sizeName,
  selectedSize,
  handleSizeSelection,
}) => {
  return (
    <label htmlFor={`size-${sizeId}`} className="cursor-pointer w-full">
      <input
        type="radio"
        id={`size-${sizeId}`}
        value={sizeId}
        onChange={() => handleSizeSelection(sizeId, sizeName)}
        checked={selectedSize === sizeId}
        className="hidden"
      />
      <div
        className={`border py-4 flex items-center justify-center rounded-md ${
          selectedSize === sizeId ? "border-blue-600" : "border-gray-300"
        }`}
      >
        {sizeName}
      </div>
    </label>
  );
};

export default Sizes;
