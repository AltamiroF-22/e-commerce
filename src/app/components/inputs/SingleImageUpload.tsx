"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface SingleImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
  maxfile: number;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  onChange,
  value,
  maxfile,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange([...value, result.info.secure_url]);
    },
    [onChange, value]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          maxFiles: maxfile,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 transition border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            >
              <TbPhotoPlus size={30} />
              <div className="font-semibold text-lg">Click to upload</div>
              <div className="absolute inset-0 w-full h-full grid grid-cols-3 gap-2">
                {value.map((src, index) => (
                  <Image
                    key={index}
                    alt="Upload"
                    src={src}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                  />
                ))}
              </div>
            </div>
          );
        }}
      </CldUploadWidget>

      {value.length > 1 && (
        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((src, index) => (
            <div key={index} className="relative w-full h-32">
              <Image
                alt={`Uploaded image ${index + 1}`}
                src={src}
                layout="fill"
                objectFit="cover"
                className="object-cover aspect-square"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
