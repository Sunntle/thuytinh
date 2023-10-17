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
  switch(params){
    case "R1": return "Khách hàng";
    case "R4" : return "Admin";
    case "Khách hàng": return "R1";
    case "Admin": return "R4";
    case "Nhân viên": return "R2";
    default:
      return "Nhân viên";
  }
}

export function truncateString(text, maxLength) {
  if(!text) return;
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}
