import moment from 'moment';

export function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
export const formatNgay = (params) => {
    return moment(params).format('DD-MM-YYYY');
}
export const formatGia = (params) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params)
}
