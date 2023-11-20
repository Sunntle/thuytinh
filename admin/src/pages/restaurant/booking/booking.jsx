import { Table, Typography, message } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { delBooking, getAllBooking } from '../../../services/api';
import ConfirmComponent from '../../../components/confirm';
import { formatNgay } from '../../../utils/format';
import UpdateBooking from './update'
const { Title } = Typography;
export const ResBooking = () => {
    const [booking, setBooking] = useState({})
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const fetchData = useCallback(async () => {
        try {
            const resBooking = await getAllBooking()
            setBooking(resBooking)
        } catch (err) {
            console.log(err)
        }
    }, [])
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const handleDeleteBooking = useCallback(
        async (id) => {
            const res = await delBooking(id);
            if (res) {
                message.open({ type: "success", content: res });
                fetchData();
            } else {
                message.open({ type: "danger", content: "Có gì đó sai sai!" });
            }
        },
        [fetchData]
    );
    const handleEditBooking = useCallback(async (data) => {
        setIsModalOpenUpdate(true);
        setDataUpdate(data);
    }, []);

    const columns = useMemo(
        () => [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'id',
                render: (_, data) => (
                    <span className='font-medium cursor-pointer'>TTLGH{data.id}</span>
                )
            },
            {
                title: 'Tên khách hàng',
                dataIndex: ['order', 'name']
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phone',
                render: (_, data) => (
                    <span>0{data.order.phone}</span>
                )
            },
            {
                title: 'Email',
                dataIndex: ['order', 'email']
            },
            {
                title: 'Bàn',
                dataIndex: 'tableId',
            },
            {
                title: 'Số người',
                dataIndex: 'party_size',
            },
            {
                title: 'Ngày đặt',
                dataIndex: 'updatedAt',
                render: (_, data) => (
                    <span>{formatNgay(data.updatedAt, 'HH:mm DD/MM/YYYY')}</span>
                ),
                sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt)
            },
            {
                title: 'Ngày nhận',
                dataIndex: 'createdAt',
                render: (_, data) => (
                    <span>{formatNgay(data.createdAt, 'HH:mm DD/MM/YYYY')}</span>
                ),
                sorter: (a, b) => a.createdAt.localeCompare(b.createdAt)
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <div className="h-10 flex items-center cursor-pointer">
                        {/* <span
                            className="bg-orange-500 px-4 rounded-md py-2 text-white"
                            onClick={() => handleEditBooking(record)}
                        >
                            Sửa
                        </span> */}
                        <ConfirmComponent
                            title="Xác nhận xóa đơn hàng này này?"
                            confirm={() => handleDeleteBooking(record.id)}
                        >
                            Xóa
                        </ConfirmComponent>
                    </div>
                ),
            },
        ],
        [handleDeleteBooking, handleEditBooking]
    );
    return (
        <>
            <div className='p-10'>
                {contextHolder}
                <Title level={3}>Danh sách đặt bàn</Title>
                <Table className='mt-4' columns={columns} dataSource={booking.rows} rowKey={"id"} />
                <UpdateBooking
                    setDataUpdate={setDataUpdate}
                    dataUpdate={dataUpdate}
                    fetchData={fetchData}
                    isModalOpenUpdate={isModalOpenUpdate}
                    setIsModalOpenUpdate={setIsModalOpenUpdate}
                    messageApi={messageApi}
                />
            </div>
        </>
    )
}
