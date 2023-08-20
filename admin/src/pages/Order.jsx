import React, { useEffect, useState } from 'react'
import { Button, Popover, Table } from 'antd';
import { getAllOrder } from '../services/api';
import { formatNgay, formatGia } from '../utils/format';



const OrderPage = () => {
    const [dataOrder, setDataOrder] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [query, setQuery] = useState({});

    useEffect(() => {
        fetchData();
    }, [dataOrder, query]);
    const fetchData = async () => {
        const res = await getAllOrder('');
        let avl = res.map(item => {
            let data = {
                id: item.id,
                name: item.user?.name,
                phone: item.user?.phone,
                employee: item.employee?.name,
                total: formatGia(item.total),
                table: item.id_table,
                createdAt: formatNgay(item.createdAt),
                quantity: item?.order_details.reduce((a, b) => a + b?.quantity, 0),
                meta: item
            }
            return data
        })
        setDataOrder(avl)
    }
    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Người phụ trách',
            dataIndex: 'employee',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Bàn',
            dataIndex: 'table',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
        },
        {
            title: 'Điều chỉnh',
            key: 'action',
            render: (_, record) => (
                <div className='w-32 h-10 flex justify-evenly items-center cursor-pointer'>
                    <span className='bg-orange-500 px-4 rounded-md py-2 text-white '>Sửa</span>
                    <span className='bg-amber-400 px-4 rounded-md py-2 text-white  '>Xóa</span>
                </div>
            ),
        },
    ];

    return (
        <div className=' px-5'>
            <div className='text-2xl text-center'>Danh sách đơn hàng</div>
            <Table columns={columns} dataSource={dataOrder} rowKey={'id'} />
        </div>
    )
}

export default OrderPage