import { Table, Typography, message } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { delBooking, getAllBooking, updateBooking } from '../../../services/api';
import ConfirmComponent from '../../../components/confirm';
import { formatNgay } from '../../../utils/format';
import UpdateBooking from './update'
import Spinner from '../../../components/spinner';
const { Title } = Typography;
export const ResBooking = () => {
    const [booking, setBooking] = useState({})
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const fetchData = useCallback(async (params = {}) => {
        try {
            const resBooking = await getAllBooking(params);
            setBooking(resBooking);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, []);
    useEffect(() => {
        fetchData({ _sort: "createdAt", _order: "desc" });
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
    const handleEditBooking = useCallback(async (id) => {
        setLoading(true)
        try {
            const res = await updateBooking({ id, status: "canceled" });
            message.open({ type: "success", content: res });
            fetchData({ _sort: "createdAt", _order: "desc" });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const columns = useMemo(
        () => [
            {
                title: 'Mã đặt hàng',
                dataIndex: 'id',
            },
            {
                title: 'Mã đơn hàng',
                dataIndex: 'orderId',
            },
            {
                title: 'Tên khách hàng',
                dataIndex: ['order', 'name']
            },
            {
                title: 'Số điện thoại',
                dataIndex: ['order', 'phone'],
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
                            title="Xác nhận hủy đơn hàng này này?"
                            confirm={() => handleEditBooking(record.id)}
                        >
                            Hủy
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
                {loading ? (<Spinner />) : (
                    <>
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
                    </>
                )}
            </div>
        </>
    )
}
