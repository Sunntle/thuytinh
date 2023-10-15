import React from "react";
import { Carousel } from "antd";

const Banner = () => {
  const imageUrls = [
    "https://images.pexels.com/photos/1150447/pexels-photo-1150447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/13262499/pexels-photo-13262499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/16845597/pexels-photo-16845597/free-photo-of-mon-an-dia-b-a-t-i-nhung.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];
  return (
    <Carousel autoplay className="mt-[-20px]">
      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <div className="h-[400px] lg:h-[600px]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              <div className="px-16 w-full h-full bg-black bg-opacity-20 flex flex-col items-start justify-center">
                <button className="px-6 py-2 z-30 w-30 h-12 text-primary bg-white bg-opacity-20 whitespace-nowrap text-center">
                  Xem Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
