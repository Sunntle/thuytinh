import { useEffect } from "react";

export function truncateString(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

export const formatCurrency = (cur) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(cur);
};

export const parseQueryString = (queryString) => {
  const pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  const result = {};

  for (let pair of pairs) {
    const [key, value] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }

  return result;
};

export const calculateTotalWithVAT = (total, VAT) => {
  VAT = VAT / 100;
  return total + total * VAT || 0;
};

export const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};
