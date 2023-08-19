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
}) {
  return (
    <>
      <Button className={` ${borderColor} ${backgroundColor} flex justify-center items-center  text-white`}>
        {iconBefore && <div className={`flex justify-center items-center ${sizeIconBefore}`}>{iconBefore}</div>}
        <span className={spacingContent}>{content}</span>
        {iconAfter && <div className={`flex justify-center items-center ${sizeIconAfter}`}>{iconAfter}</div>}
      </Button>
    </>
  );
}

export default ButtonComponents;
