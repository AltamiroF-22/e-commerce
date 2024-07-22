"use client";
import React, { useState } from "react";

const ColorPickerComponent: React.FC = () => {
  const [color, setColor] = useState<string>("#00ff00");

  const PickColor = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <div className="flex relative justify-around p-4 items-center">
      <div
        className="w-24 h-8 flex border text-gray-950 items-center bg-slate-100 rounded justify-center"
       
      >
        <p className="px-2 pointer-events-none select-none absolute"> set a color</p>
        <input
          className="w-full h-full opacity-0" // Hide the native input but keep its functionality
          type="color"
          value={color}
          onChange={(e) => PickColor(e.target.value)}
        />
            
      </div>
      <div className="w-10 h-10 rounded-full" style={{background: color}}> </div>
    </div>
  );
};

export default ColorPickerComponent;
