import { Button } from "antd";

/* eslint-disable */
function ButtonComponents({
  borderColor,
  backgroundColor,
  iconBefore,
  iconAfter,
  spacingContent,
  sizeIconBefore,
  sizeIconAfter,
  content,
  onClick,
  colorText,
  type,
  htmlType
}) {
  return (
    <>
      <Button htmlType={htmlType || "button"}
        className={` ${borderColor} ${backgroundColor} inline-flex justify-center items-center  ${colorText ?? "text-white"
          }`}
        onClick={onClick}
      >
        {iconBefore && <div className={`flex justify-center items-center ${sizeIconBefore}`}>{iconBefore}</div>}
        <span className={spacingContent}>{content}</span>
        {iconAfter && <div className={`flex justify-center items-center ${sizeIconAfter}`}>{iconAfter}</div>}
      </Button>
    </>
  );
}

export default ButtonComponents;
