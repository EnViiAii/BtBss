import clsx from "clsx";
import React from "react";

const Title = ({ children, bg }) => {
  return (
    <div
      className={clsx(`my-4 w-fit py-2`, {
        "bg-gradient-to-l from-[#2400C6] to-[#A800B6] inline-block text-transparent bg-clip-text":
          bg,
        "text-[#303030]": !bg,
      })}
    >
      <p className="font-semibold text-[18px]">{children}</p>
    </div>
  );
};

export default Title;
