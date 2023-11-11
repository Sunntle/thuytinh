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
  return new Date(year, +month + 1, 0).getDate()
}
export const roleRext = (params) => {
  switch (params) {
    case "R1": return "Khách hàng";
    case "R4": return "Admin";
    case "Khách hàng": return "R1";
    case "Admin": return "R4";
    case "Nhân viên": return "R2";
    default:
      return "Nhân viên";
  }
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
    if (transactionDate.toDateString() === today.toDateString()) {
      dailyRevenue += totalOrder.total;
    }
  }
  return dailyRevenue;
}

let unitlist = ["", "K", "M", "G"];
export function formatnumber(number) {
  let sign = Math.sign(number);
  let unit = 0;

  while (Math.abs(number) >= 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 100) / 10;
  }
  return (sign * Math.abs(number) + unitlist[unit]);
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
export function calculateMonthlyRevenue(transactions) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let monthlyRevenue = 0;

  for (const totalOrder of transactions) {
    const transactionDate = new Date(totalOrder.createdAt);
    if (transactionDate >= firstDayOfMonth && transactionDate <= lastDayOfMonth) {
      monthlyRevenue += totalOrder.total;
    }
  }

  return monthlyRevenue;
}
