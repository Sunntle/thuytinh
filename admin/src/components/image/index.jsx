/* eslint-disable no-undef */
import {Image} from "antd"
import { memo } from "react";
function ImageComponent({src, list, className, preview}) {
  if(list && list?.length > 0){
    return (
        <Image.PreviewGroup items={list.map(el=> el.url)}>
          <Image
            className={className ? className : "w-full"}
            style={className ? "" : { maxWidth: "150px" }}
            src={src}
            preview={!preview}
            alt=""
            fallback="https://res.cloudinary.com/dbru1hnfl/image/upload/w_400,h_300/v1701273282/thumb_sgmima.png"
          />
        </Image.PreviewGroup>
      );
  }
  return <Image
  className={className ? className : "w-full"}
  style={className ? "" : { maxWidth: "150px" }}
  src={src}
  preview={!preview}
  alt=""
  fallback="https://res.cloudinary.com/dbru1hnfl/image/upload/w_400,h_300/v1701273282/thumb_sgmima.png"
/>
}

export default memo(ImageComponent)