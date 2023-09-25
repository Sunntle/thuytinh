import { BiCategory } from "react-icons/bi";
import { ShopOutlined } from "@ant-design/icons";
import { getItem } from "../utils/format";
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
export const desc = ["terrible", "bad", "normal", "good", "wonderful"];
export const NAV_ITEMS = [
  getItem("Quản lí", null, <BiCategory />, [
    getItem("Dashboard", "/admin"),
    getItem("Thực đơn món ăn", "/admin/menu"),
    getItem("Món ăn", "/admin/product"),
    getItem("Nguyên liệu", "/admin/material"),
    getItem("Danh mục", "/admin/category"),
    getItem("Công thức", "/admin/recipe"),
    getItem("Hóa đơn ", "/admin/order"),
    getItem("Đánh giá", "/admin/reviews"),
  ]),
  getItem("Nhà hàng", null, <ShopOutlined />, [
    getItem("Chọn bàn","/employee/choosetable"),
    getItem("Thực đơn món ăn","/employee/menu"),
    getItem("Doanh thu","/employee/renvenue")
  ]),
];
