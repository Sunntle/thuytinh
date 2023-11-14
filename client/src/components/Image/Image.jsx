import { Skeleton } from "antd";
import "./index.css";
import PropTypes from "prop-types";

const Image = ({ isLoading, src, alt, className }) => {
  const skeletonImageStyle = { width: "100%", height: "100%" };
  return isLoading ? (
    <Skeleton.Image active={true} style={{ ...skeletonImageStyle }} />
  ) : (
    <img
      loading={"lazy"}
      className={`w-full h-full object-cover ${className}`}
      src={src}
      alt={alt}
    />
  );
};
// Image.propTypes = {
//   isLoading: PropTypes.bool.isRequired,
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
//   className: PropTypes.string,
// };
export default Image;
