export const truncateString = (str) => {
    return str.length > 10 ? str.substring(0,10) + "..." : str
}

export const formatCurrency = (cur) => {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(cur)
}