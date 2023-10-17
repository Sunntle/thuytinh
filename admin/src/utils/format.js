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
  if (!text) return;
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}


export function calculateDailyRevenue(transactions) {
  const today = new Date();
  let dailyRevenue = 0;
  for (const totalOrder of transactions) {
    const transactionDate = new Date(totalOrder.createdAt);
    console.log(transactionDate.toDateString());
    if (transactionDate.toDateString() === today.toDateString()) {
      dailyRevenue += totalOrder.total;
    }
  }
  return dailyRevenue;
}

export function calculateWeeklyRevenue(transactions) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - dayOfWeek + 7);

  let weeklyRevenue = 0;

  for (const totalOrder of transactions) {
    const transactionDate = new Date(totalOrder.createdAt);
    if (transactionDate >= startDate && transactionDate <= endDate) {
      weeklyRevenue += totalOrder.total;
    }
  }

  return weeklyRevenue;
}
