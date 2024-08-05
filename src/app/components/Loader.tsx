"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex items-center justify-center flex-col ">
        <PuffLoader size={95} color="gray"/>
    </div>
  );
};

export default Loader;