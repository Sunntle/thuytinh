import { useCallback, useEffect, useMemo, useState } from 'react'
import { delTables, getAllTable } from '../../services/api';
import ButtonComponents from "../../components/button";
import { Col, Row, Table, message, Typography, QRCode } from 'antd'
import ConfirmComponent from '../../components/confirm';
import CreateTable from './create';
import UpdateTable from './update';
import Spinner from '../../components/spinner';
import { socket } from '../../socket';
const { Title } = Typography;
const options = [
    { value: 'out', label: 'Bên ngoài' },
    { value: 'in', label: 'Bên trong' }
];
const TablePage = () => {
    const [loading, setLoading] = useState(true);
    const [listTable, setListTable] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)

    const fetchData = useCallback(async () => {
        let res = await getAllTable();
        setListTable(res)
        setLoading(false)
    }, [])


    const handleDeleteTable = useCallback(async ({ id }) => {
        const res = await delTables(id);
        if (res) messageApi.open({
            type: 'success',
            content: res
        });
        fetchData()
    }, [messageApi, fetchData])

    useEffect(() => {
        socket.on("status table", (arg) => {
            console.log(arg)
        })
        return () => {
            socket.off("status table")
        }
    }, [socket])
    const handleEditTable = useCallback(async (data) => {
        setIsModalOpenUpdate(true);
        setDataUpdate(data);
    }, [])

    const columns = useMemo(() => [
        {
            title: "Tên Bàn",
            dataIndex: "name_table",
        },
        {
            title: "Mã quét",
            dataIndex: "qr_code",
            render: (_, record) => (
                <QRCode value={record.qr_code} size={90} />
            )
        },
        {
            title: "Mã bàn",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Vị trí",
            dataIndex: "position",
            filters: [
                {
                    text: "Trong nhà",
                    value: "in",
                },
                {
                    text: "Ngoài trời",
                    value: "out",
                }
            ],
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.position.startsWith(value),
            render: (_, record) => (
                <span>
                    {record.position === "in" ? "Trong nhà" : "Ngoài trời"}
                </span>
            )
        },
        {
            title: "Tổng số đơn hàng đã đặt",
            dataIndex: "total_booked",
            width: "20%",
            sorter: (a, b) => a.total_booked - b.total_booked,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            sorter: (a, b) => a.status_table - b.status_table,
            render: (_, record) =>
                record.status_table == 0 ? (
                    <ButtonComponents
                        content={"Trống"}
                        spacingContent={"px-4 py-2"}
                        className={"h-9 border-none text-green-500 bg-green-200"}
                    />
                ) : (
                    <ButtonComponents
                        content={"Bận"}
                        spacingContent={"px-4 py-2"}
                        className={"h-9 border-none text-red-500 bg-red-200"}
                    />
                )
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="h-10 flex items-center cursor-pointer">
                    <span
                        className="bg-orange-500 px-4 rounded-md py-2 text-white"
                        onClick={() => handleEditTable(record)}
                    >
                        Sửa
                    </span>
                    <ConfirmComponent
                        title="Xác nhận table này khỏi nhà hàng ?"
                        confirm={() => handleDeleteTable({ id: record.id, name: record.name_table })}
                    >
                        Xóa
                    </ConfirmComponent>
                </div>
            ),
        }
    ], [handleDeleteTable, handleEditTable]);

    useEffect(() => {
        fetchData()
    }, [fetchData])
    return (
        <div className='my-7 px-5'>

            {contextHolder}
            {loading ? (
                <Spinner />
            ) : (<>
                <Row justify="space-between" align="center" className="mb-4">
                    <Col xs={6}>
                        <Title level={3}>Danh sách món ăn</Title>
                    </Col>
                    <Col xs={6} style={{ textAlign: "-webkit-right" }}>
                        <ButtonComponents
                            className="border-borderSecondaryColor text-main"
                            content={"Thêm mới"}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </Col>
                </Row>
                <Table dataSource={listTable} columns={columns} rowKey={"id"} />
                <CreateTable options={options} fetchData={fetchData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} messageApi={messageApi} />
                <UpdateTable setDataUpdate={setDataUpdate} options={options} dataUpdate={dataUpdate} fetchData={fetchData} isModalOpenUpdate={isModalOpenUpdate} setIsModalOpenUpdate={setIsModalOpenUpdate} messageApi={messageApi} />
            </>)
            }
        </div>
    )
}

export default TablePage