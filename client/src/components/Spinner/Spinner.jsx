import { Spin } from "antd";
import PropTypes from "prop-types";

const Spinner = ({ className }) => {
  return (
    <div
      className={`relative h-[50vh] w-full flex flex-col justify-center items-center ${className}`}
    >
      <Spin size={"large"} />
      <span className="mt-5 text-base font-semibold">
        Quý khách vui lòng đợi trong giây lát...
      </span>
    </div>
  );
};
Spinner.propTypes = {
  className: PropTypes.string,
};
export default Spinner;
