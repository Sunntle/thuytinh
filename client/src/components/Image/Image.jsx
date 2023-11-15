/* eslint-disable react/prop-types */
import { Skeleton } from "antd";
import "./index.css";

const Image = ({ isLoading = false, src, alt, className }) => {
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

export default Image;
