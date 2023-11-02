import { Skeleton } from "antd";
import "./index.css";

const Image = ({ loading, src, alt, className }) => {
  const skeletonImageStyle = { width: "100%", height: "100%" };
  return loading ? (
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
