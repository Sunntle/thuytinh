import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Col,
  Drawer,
  Modal,
  Row,
  Table,
  Tabs,
  message,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Typography,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BiRefresh } from "react-icons/bi";
import {
  delOrder,
  getAllOrder,
  getAllTable,
  getAllUser,
  updateOrderAdmin,
} from "../../services/api";
import { formatNgay, formatGia, formatnumber, renderTextPay } from "../../utils/format";
import ConfirmComponent from "../../components/confirm";
import moment from "moment";
import Spinner from "../../components/spinner";
import { useSelector } from "react-redux";
const { Title } = Typography;
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const initData = {
  show: false,
  data: [],
};
const statusOrder = [
  { value: 0, label: "Hủy đơn hàng" },
  { value: 1, label: "Đơn hàng mới" },
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Đã thanh toán" },
  { value: 4, label: "Hoàn tất" },
]

const OrderPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const [tableAndEmployee, setTableAndEmployee] = useState(null);
  const [openModalUpdate, setOpenModalUpdate] = useState(initData);
  const [openOrderDetail, setOpenOrderDetail] = useState(initData);
  const notifications = useSelector(state => state.notifications)

  const fetchData = useCallback(async (query) => {
    try{
      const { data, total } = await getAllOrder(query);
    const avl =
      total > 0 &&
      data.map((item) => {
        const status = item.tablebyorders[0]?.status === "confirmed" && +item.status == 0 ? statusOrder[1] : statusOrder.find((i) => i.value == item.status);
        let data = {
          id: item.id,
          name: item.name,
          phone: item.phone,
          user: item.name,
          total: item.total,
          table: item?.tablebyorders?.map((i) => i.tableId).join(", "),
          employee: item?.user?.name,
          id_employee: item.id_employee,
          status: status.label,
          payment: renderTextPay(item.payment_gateway),
          createdAt: formatNgay(item.createdAt, "HH:mm DD/MM/YYYY"),
          quantity: item?.order_details.reduce((a, b) => a + b?.quantity, 0),
          meta: {
            ...item,
            table: item?.tablebyorders?.map((i) => i.tableId.toString()),
          },
        };
        return data;
      });
    setDataOrder(avl);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }, []);

  const fetchDataEmployeeAndTable = async () => {
    let [nv, ban] = await Promise.all([
      getAllUser({ _noQuery: 1 }),
      getAllTable({ _noQuery: 1 }),
    ]);
    let optionsBan = ban.map((i) => ({
      value: i.id.toString(),
      label: i.name_table,
    }));
    let optionsNv = nv.map((i) => ({
      value: i.id,
      label: i.name,
    }));
    setTableAndEmployee({ table: optionsBan, employee: optionsNv });
  };
  useEffect(() => {
    fetchData({
      _sort: "createdAt",
      _order: "DESC",
    });
  }, [fetchData]);
  useEffect(() => {
    fetchDataEmployeeAndTable();
  }, []);

  const handDeleteOrder = useCallback(async (id) => {
    await delOrder(id);
    fetchData({
      _sort: "createdAt",
      _order: "DESC",
    });
    messageApi.open({
      type: "success",
      content: "Đã xóa đơn " + id,
    });
  }, [fetchData, messageApi]);
  const showModalUpdate = useCallback((record) => {
    let data = { ...record };
    data.meta.createdAt = moment(data.meta.createdAt);
    setOpenModalUpdate({ data: data.meta, show: true });
    form.setFieldsValue(data.meta);
  }, [form]);

  const onClose = () => {
    setOpenOrderDetail(initData);
    setOpenModalUpdate(initData);
  };

  const onFinish = async (values) => {
    await updateOrderAdmin(values);
    fetchData({
      _sort: "createdAt",
      _order: "DESC",
    });
    onClose();
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = useCallback((dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes(value?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  }), []);
  useEffect(() => {
    if (notifications.isLoading == false && notifications.lastNotification !== null && notifications.lastNotification?.type === "order" && notifications.lastNotification?.status === false) {
      fetchData({
        _sort: "createdAt",
        _order: "DESC",
      });
    }
  }, [fetchData, notifications]);

  const columns = useMemo(() => ([
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      align: "center",
      fixed: "left",
      width: 100,
      render: (_, record) => (
        <span
          className="font-medium cursor-pointer"
          onClick={() => showDetail(record)}
        >
          {record.id}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: statusOrder.map(item => ({ ...item, text: item.label, value: item.label })),
      onFilter: (value, record) => {
        return record.status == value
      },
      width: 150,
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
      width: 150,
      ...getColumnSearchProps("name"),
    },
    // {
    //   title: "Số điện thoại",
    //   dataIndex: "phone",
    //   width: 150,
    //   ...getColumnSearchProps("phone"),
    //   render: (_, data) => (
    //     <span>{data.phone ? "0" + data.phone : "Không có số điện thoại"}</span>
    //   )
    // },
    {
      title: "Nhân viên",
      dataIndex: "employee",
      width: 150,
      ...getColumnSearchProps("employee"),
      render: (_, data) => (
        <span>{data.employee ? data.employee : "Khách hàng"}</span>
      )
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
      width: 150,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Bàn",
      dataIndex: "table",
      align: "center",
      width: 150,
    },

    {
      title: "Thanh toán",
      dataIndex: "payment",
      align: "center",
      width: 200,
      sorter: (a, b) => a.payment.localeCompare(b.payment),
    },

    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      align: "center",
      width: 150,
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      align: "center",
      width: 150,
      render: (_, record) => (
        <span className="text-main font-medium text-lg">
          {formatnumber(record.total)}
        </span>
      ),
    },
    {
      title: "Điều chỉnh",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <div className="h-10 flex items-center cursor-pointer">
          <span
            className="bg-orange-500 px-4 rounded-md py-2 text-white"
            onClick={() => showModalUpdate(record)}
          >
            Sửa
          </span>
          <ConfirmComponent
            title="Xác nhận xóa đơn hàng"
            confirm={() => handDeleteOrder(record.id)}
          >
            Xóa
          </ConfirmComponent>
        </div>
      ),
    },
  ]), [getColumnSearchProps, handDeleteOrder, showModalUpdate, statusOrder]);
  const showDetail = (record) => {
    setOpenOrderDetail({ show: true, data: record.meta });
  };


  return (
    <div className="my-7 px-5">
      {contextHolder}
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-5">
          <Row justify="space-between" align="center" className="mb-4 px-4">
            <Col xs={6}>
              <Title level={3}>Danh sách hóa đơn</Title>
            </Col>
            <Col
              xs={6}
              style={{ textAlign: "-webkit-right" }}
              onClick={handleReset}
            >
              <BiRefresh size={24} />
            </Col>
          </Row>
          <Table
            className="table_order"
            columns={columns}
            dataSource={dataOrder}
            rowKey={"id"}
            scroll={{
              x: 1500,
            }}
          />
          <Drawer
            title="Chi tiết đơn hàng"
            placement="right"
            size="large"
            onClose={onClose}
            open={openOrderDetail?.show}
          >
            {openOrderDetail?.data?.order_details?.map((item) => (
              <div className="p-2 border-2" key={item.id}>
                <div className="flex justify-around">
                  <div className="w-1/6">
                    <img
                      src={item.product?.imageproducts[0].url}
                      className="w-full"
                    />
                  </div>
                  <div className="w-3/6">
                    <div className="w-full h-full flex flex-col justify-evenly">
                      <div>{item.product.name_product}</div>
                      <div>{formatGia(item.product.price)}</div>
                    </div>
                  </div>
                  <div className="w-1/6">
                    <div className="w-full h-full flex flex-col justify-evenly">
                      <div>{item.quantity}</div>
                      <div>{item.status_food}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Drawer>

          <Modal
            title="Cập nhật đơn hàng"
            footer={null}
            centered
            open={openModalUpdate.show}
            width={500}
            onCancel={onClose}
          >
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: `Thông tin`,
                  children: (
                    <Form
                      form={form}
                      name="basic"
                      labelCol={{
                        span: 24,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item name="id" hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Tên người dùng"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên khách hàng!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="table"
                      >
                        <Input hidden />
                      </Form.Item>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Vui lòng nhập số điện thoại !",
                      //   },
                      // ]}
                      >
                        <Input />
                      </Form.Item>

                      <Row gutter={12}>
                        <Col xs={12}>
                          <Form.Item
                            label="Tổng tiền"
                            name="total"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tổng tiền !",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={12}>
                          <Form.Item
                            label="Người phục vụ"
                            name="id_employee"
                          // rules={[{ required: true }]}
                          >
                            <Select
                              placeholder="Nhân viên"
                              allowClear
                              options={tableAndEmployee?.employee}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={12}>
                        <Col xs={12}>
                          <Form.Item
                            name="createdAt"
                            label="Ngày đặt *(giờ/phút)"
                            {...config}
                          >
                            <DatePicker
                              showTime
                              format="DD-MM-YYYY HH:mm"
                              placeholder="Ngày giờ đặt"
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12}>
                          <Form.Item
                            label="Trạng thái đơn hàng"
                            name="status"
                            rules={[{ required: true }]}
                          >
                            <Select allowClear options={statusOrder} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        wrapperCol={{
                          offset: 20,
                          span: 16,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Gửi
                        </Button>
                      </Form.Item>
                    </Form>
                  ),
                },
                {
                  key: "2",
                  label: `Chi tiết`,
                  children: (
                    <div className="h-full">
                      {openModalUpdate?.data?.order_details?.map((item) => (
                        <div className="p-2 border-2" key={item.id}>
                          <div className="flex justify-around">
                            <div className="w-1/6">
                              <img
                                src={item.product.imageproducts[0].url}
                                className="w-full"
                              />
                            </div>
                            <div className="w-3/6">
                              <div className="w-full h-full flex flex-col justify-evenly">
                                <div>{item.product.name_product}</div>
                                <div>{formatGia(item.product.price)}</div>
                              </div>
                            </div>
                            <div className="w-1/6">
                              <div className="w-full h-full flex flex-col justify-evenly">
                                <div>{item.quantity}</div>
                                <div>{item.status_food}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
