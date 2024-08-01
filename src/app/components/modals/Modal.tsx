"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactNode;
  buttonLabel: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  buttonLabel
}) => {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/*content*/}

          <div
            className={`translate duration-300 h-full  ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header*/}
              <div className="flex items-center p-5 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className=" text-md font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className="relative p-5 flex-auto">{body}</div>
              <div className=" flex flex-row items-center gap-4 w-full">
               <Button label="Submit" onClick={handleSubmit}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
