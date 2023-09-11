export function truncateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}


export const formatCurrency = (cur) => {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(cur)
}