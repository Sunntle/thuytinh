import moment from "moment";

export function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
export const formatNgay = (params, option = "DD-MM-YYYY") => {
  return moment(params).format(option);
};
export const formatGia = (params) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(params);
};
export function getDaysInMonth(year, month) {
  month--
  return new Date(year, month + 1, 0).getDate()
}
export const roleRext = (params) => {
  if ("R1" === params) return "Khách hàng"
  else if ("R2" === params) return "Nhân viên"
  else if ("R4" === params) return "Admin"
}

export function truncateString(text, maxLength) {
  if(!text) return;
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}
