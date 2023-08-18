import React from "react";

const ButtonComponent = ({
  type,
  size,
  children,
  className,
  onClick,
  disable,
}) => {
  const textSize =
    size === "sm"
      ? "text-sm"
      : size === "md"
      ? "text-base"
      : size === "lg"
      ? "text-lg"
      : size === "xl"
      ? "text-xl"
      : "text-base";

  const theme = {
    primary: `text-white bg-primary border border-primary focus:bg-white focus:text-primary ${textSize}`,
    outline: `text-primary bg-white border border-primary focus:bg-primary focus:text-white transition-colors ${textSize}`,
    disable: `opacity-50`,
  };

  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={
        theme[type] +
        ` ${className} ${disable === true ? theme["disable"] : ""}`
      }
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
