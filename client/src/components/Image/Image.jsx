/* eslint-disable react/prop-types */
import { Skeleton } from "antd";
import "./index.css";

const Image = ({ isLoading = false, src, alt, className }) => {

  const handErr = (event) => {
    event.target.src = 'https://res.cloudinary.com/dbru1hnfl/image/upload/v1701273282/thumb_sgmima.png';
    event.onError = null;
  }
  return isLoading ? (
    <Skeleton.Image active={true} size={"large"} />
  ) : (
    <img
      loading={"lazy"}
      className={`w-full h-full object-cover ${className}`}
      src={src}
      alt={alt}
      onError={(event) => handErr(event)}
    />
  );
};

export default Image;
