import { useEffect, useState } from "react";
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
} from "antd";
import { getAllOrder, updateOrder } from "../../services/api";
import { formatNgay, formatGia } from "../../utils/format";
import ConfirmComponent from "../../components/confirm";
import moment from "moment";
const options = [];
for (let i = 1; i < 10; i++) {
  options.push({
    value: i,
    label: "Bàn số " + i,
  });
}
const nv = [
  {
    value: 1,
    label: "Le Gia Huy",
  },
  {
    value: 2,
    label: "Le cong thanh tai",
  },
  {
    value: 3,
    label: "Pham hoang huy",
  },
];
const iii =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEFsVOFE8XqqekyR9CNQv-Zdm1Rf8bvezhw&usqp=CAU";
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
const OrderPage = () => {
  const [form] = Form.useForm();
  const [dataOrder, setDataOrder] = useState([]);
  const [openModalUpdate, setOpenModalUpdate] = useState(initData);
  const [openOrderDetail, setOpenOrderDetail] = useState(initData);
  const [query, setQuery] = useState({
    key_sort: "createdAt",
    val_sort: "DESC",
  });

  useEffect(() => {
    fetchData();
  }, [query]);


  const fetchData = async () => {
    const res = await getAllOrder(query);
    const avl = res.data.map(item => {
      let data = {
        id: item.id,
        name: item.name,
        phone: item.phone,
        employee: item.employee?.name,
        total: item.total,
        id_table: item.id_table,
        id_employee: item.id_employee,
        payment: item.payment,
        date_order: formatNgay(item.date_order),
        quantity: item?.order_details.reduce((a, b) => a + b?.quantity, 0),
        meta: item
      }
      return data
    })
    setDataOrder(avl)
  }
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      render: (_, record) => (
        <span className='font-medium cursor-pointer' onClick={() => showDetail(record)}>TTLGH{record.id}</span>
      )
    },
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
      dataIndex: 'id_table',
    },
    {
      title: 'Thanh toán',
      dataIndex: 'payment',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date_order',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      render: (_, record) => (
        <span className='text-main font-medium text-lg'>{formatGia(record.total)}</span>
      )
    },
    {
      title: 'Điều chỉnh',
      key: 'action',
      render: (_, record) => (
        <div className='h-10 flex items-center cursor-pointer'>
          <span className='bg-orange-500 px-4 rounded-md py-2 text-white' onClick={() => showModalUpdate(record)} >Sửa</span>
          <ConfirmComponent title="Xác nhận xóa đơn hàng" confirm={() => handDeleteOrder(record.id)} >Xóa</ConfirmComponent>
        </div>
      ),
    },
  ];
  const showDetail = (record) => {
    setOpenOrderDetail({ show: true, data: record.meta });
  }
  const showModalUpdate = (record) => {
    let data = { ...record };
    data.date_order = moment(data.meta.date_order);
    setOpenModalUpdate({ data, show: true })
    form.setFieldsValue(data);
  }
  const handDeleteOrder = async (id) => {
    // const res = await delOrder(id);
    fetchData()
    message.success(id);
  };
  const onClose = () => {
    setOpenOrderDetail(initData);
    setOpenModalUpdate(initData);
  };
  const onChange = (key) => {
    console.log(key);
  };

  const onFinish = async (values) => {
    let res = await updateOrder(values);
    console.log(res);
    fetchData();
    onClose();
  };

  return (
    <div className=" px-5">
      <Row justify="space-between" align="center" className="mb-4">
        <Col xs={6}>
          <Title level={3}>Công thức sản phẩm</Title>
        </Col>
        <Col xs={6} style={{ textAlign: "-webkit-right" }}></Col>
      </Row>
      <Table columns={columns} dataSource={dataOrder} rowKey={"id"} />
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
                <img src={iii} className="w-full" />
              </div>
              <div className="w-3/6">
                <div className="w-full h-full flex flex-col justify-evenly">
                  <div>{item.product.name_product}</div>
                  <div>{item.product.price}</div>
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
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại !",
                      },
                    ]}
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
                        rules={[{ required: true }]}
                      >
                        <Select
                          placeholder="Nhân viên"
                          allowClear
                          options={nv}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={12}>
                    <Col xs={12}>
                      <Form.Item
                        name="date_order"
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
                        label="Bàn phục vụ"
                        name="id_table"
                        rules={[
                          { required: true, message: "Vui lòng chọn bàn !" },
                        ]}
                      >
                        <Select placeholder="Bàn ăn" options={options}></Select>
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
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: "2",
              label: `Chi tiết`,
              children: (
                <div className="h-40">
                  <Row>
                    <Col xs={5}>
                      <img src={iii} />{" "}
                    </Col>
                    <Col xs={10}></Col>
                    <Col xs={5}></Col>
                  </Row>
                </div>
              ),
            },
          ]}
          onChange={onChange}
        />
      </Modal>
    </div>
  );
};

export default OrderPage;
