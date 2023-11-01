import { BiCategory } from "react-icons/bi";
import { ShopOutlined } from "@ant-design/icons";
import { getItem } from "./format";
export const limit = 9;
export const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const days = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];
export const desc = ["Rất tệ", "Tệ", "Bình thường", "Ngon", "Tuyệt vời"];
export const NAV_ITEMS = [
  getItem("Quản lí", null, <BiCategory />, [
    getItem("Dashboard", "/admin"),
    getItem("Quản lí bàn", "/admin/table"),
    getItem("Món ăn", "/admin/product"),
    getItem("Nguyên liệu", "/admin/material"),
    getItem("Danh mục", "/admin/category"),
    getItem("Công thức", "/admin/recipe"),
    getItem("Hóa đơn ", "/admin/order"),
    getItem("Đánh giá", "/admin/reviews"),
    getItem("Tài khoản", "/admin/user"),
  ]),
  getItem("Nhà hàng", null, <ShopOutlined />, [
    getItem("Chọn bàn", "/employee/choosetable"),
    getItem("Thực đơn món ăn", "/employee/menu"),
    getItem("Doanh thu", "/employee/renvenue")
  ]),
];
export const url = 'http://localhost:3000/ban-';

export const DarkSvg = () => (
  <svg
    fill="#ffffff"
    width="1em"
    height="1em"
    viewBox="0 0 35 35"
    data-name="Layer 2"
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier"></g>
    <g
      id="SVGRepo_tracerCarrier"
    >
      <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
    </g>
    <g id="SVGRepo_iconCarrier">
      <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
    </g>
  </svg>
);
export const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];
export const overMasterial = ["2", "500", "9", "5", "50", "20", "10"];





export const LightSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24.00 24.00"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" ></g>
    <g
      id="SVGRepo_tracerCarrier"

    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g
      >
        {" "}
        <path
          d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"

        ></path>{" "}
        <path
          d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          fill="#ffffff"

        ></path>{" "}
        <path d="M12 19v4M12 1v4"></path>{" "}
      </g>{" "}
      <defs>
        {" "}
        <clipPath id="a">
          {" "}
          <path fill="#ffffff" d="M0 0h24v24H0z"></path>{" "}
        </clipPath>{" "}
      </defs>{" "}
    </g>
  </svg>
);