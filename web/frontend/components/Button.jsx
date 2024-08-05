import clsx from "clsx";
import React from "react";

const Button = ({ children, type, onClick, submit = false, disable }) => {
  return (
    <button
      type={clsx({
        submit: submit,
        button: !submit,
      })}
      onClick={disable ? () => {} : onClick}
      className={clsx(
        `px-4 py-2 font-medium rounded-[4px] focus:ring-2 select-none text-[14px] w-fit`,
        {
          "bg-[#007a5c] text-white": type === "primary",
          "border-[1px] bg-opacity-50 bg-gray-100 border-solid border-gray-400":
            type === "secondary",
          "bg-opacity-50 cursor-not-allowed": disable,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
