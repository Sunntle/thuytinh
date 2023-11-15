import { Table, Typography, message } from 'antd';
import {useCallback, useEffect, useMemo, useState } from 'react'
import { delBooking, getAllBooking } from '../../../services/api';
import ConfirmComponent from '../../../components/confirm';
import { formatNgay } from '../../../utils/format';
const { Title } = Typography;
export const ResBooking = () => {
    const [booking, setBooking] = useState({})
    const fetchData = useCallback(async () => {
        try {
            const resBooking = await getAllBooking()
            setBooking(resBooking)
        } catch (err) {
            console.log(err)
        }
    },[])
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
                dataIndex: 'orderId',
            },
            {
                title: 'Số người',
                dataIndex:'party_size',
            },
            {
                title: 'Ngày đặt',
                dataIndex: 'updatedAt',
                render: (_,data) =>(
                    <span>{formatNgay(data.updatedAt,'HH:MM DD/MM/YYYY')}</span>
                ),
                sorter: (a, b) => a.formatNgay(updatedAt).localeCompare(b.formatNgay(updatedAt))
            },
            {
                title: 'Ngày nhận',
                dataIndex: 'createdAt',
                render:(_,data)=>(
                    <span>{formatNgay(data.createdAt,'HH:MM DD/MM/YYYY')}</span>
                ),
                sorter: (a, b) => a.createdAt.localeCompare(b.createdAt)
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <div className="h-10 flex items-center cursor-pointer">
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
        []
    );
    return (
        <>
        <div className='p-10'>
            <Title level={3}>Danh sách đặt bàn</Title>
            <Table className='mt-4' columns={columns} dataSource={booking.rows} rowKey={"id"} />
        </div>
        </>
    )
}
