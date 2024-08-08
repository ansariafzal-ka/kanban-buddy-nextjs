import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <RotatingLines
        strokeColor="#fff"
        strokeWidth="3"
        animationDuration="1.5"
        width="24"
        visible={true}
      />
    </div>
  );
};

export default Loader;
