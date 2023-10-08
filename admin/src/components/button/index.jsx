import { Button } from "antd";

/* eslint-disable */
function ButtonComponents({
  iconBefore,
  iconAfter,
  spacingContent,
  sizeIconBefore,
  sizeIconAfter,
  content,
  onClick,
  type,
  className,
  htmlType,
  customAttribute,
}) {
  return (
    <>
      <Button
        {...customAttribute}
        htmlType={htmlType || "button"}
        className={`${className} inline-flex justify-center items-center`}
        onClick={onClick}
      >
        {iconBefore && (
          <div className={`flex justify-center items-center ${sizeIconBefore}`}>
            {iconBefore}
          </div>
        )}
        <span className={spacingContent}>{content}</span>
        {iconAfter && (
          <div className={`flex justify-center items-center ${sizeIconAfter}`}>
            {iconAfter}
          </div>
        )}
      </Button>
    </>
  );
}

export default ButtonComponents;
