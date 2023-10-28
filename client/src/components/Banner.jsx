import { Typography } from "antd";
import { Link } from "react-router-dom";
const imageUrls =
    "https://images.pexels.com/photos/13262499/pexels-photo-13262499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
const Banner = () => {
  
  return (
        <div>
          <div className="h-[100vh] relative">
            <div
              className="h-full w-full "
              style={{
                backgroundImage: `url(${imageUrls})`,
                filter: 'brightness(50%)',
                backgroundPosition: 'center'
              }}
            > 
            </div>
            <div className="absolute top-0 lg:px-16 md:px-12 px-8 w-full max-w-2xl h-full flex flex-col items-start justify-center">
                <Typography.Title style={{color: '#FC8019', margin: 0}} level={1}>Nhà hàng hải sản Thủy Tinh</Typography.Title>
                <h4 className="text-white my-5 py-2 ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi illum cupiditate quaerat ratione vero natus eligendi culpa hic, ipsum aliquam placeat minima consectetur neque eveniet, quam nam eum excepturi nobis? </h4>
                <Link to="menu"  size="large" type="text" className=" text-primary hover:text-white transform transition duration-300 ">Xem thêm</Link>
              </div>
          </div>
        </div>
  );
};

export default Banner;
