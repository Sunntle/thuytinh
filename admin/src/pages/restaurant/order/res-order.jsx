import { useEffect, useState } from 'react'
import "../payment/res-payment.css"
import { Button, Modal, Form, Radio, Drawer, Collapse, notification } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { AddCartUpdate, RemoveAllCart } from '../../../redux/cartsystem/cartSystem'
import { useNavigate } from 'react-router-dom';
import { createPayment, updateCompleteOrder, updatePayment } from '../../../services/api'
import { AddTableList, RemoveTableList } from '../../../redux/table/listTableSystem'
import { formatGia } from '../../../utils/format'
import moment from 'moment'
import ButtonComponents from '../../../components/button'

const RenderFooter = ({
  tablelist,
  handleUpdate,
  handleCancel,
  isModalPay,
  handleOk,
  handleCancel2,
  form,
  onFinish,
  showModal,
  openSwithTable,
  submitPayment,
  customize
}) => (
  <> <div className=' dark:bg-darkModeBgBox Order-total border rounded-md'>
    <div className={`tax ${customize ? "text-white" : "text-black"}`}>
      <span>Thuế VAT:</span>
      <span className='float-right'>10%</span>
    </div>
    <div className='total mt-2'>
      <span className={`font-medium text-lg ${customize ? "text-white" : "text-black"}`}>Tổng tiền:</span>
      <span className='float-right text-lg text-main'>{formatGia(tablelist?.tablebyorders[0]?.order?.total || 0)}</span>
    </div>
    <div className='grid grid-cols-4 mt-12'>
      <div className='flex justify-center font-semibold col-span-2 m-1'>
        <button className='bg-red-500 text-white' onClick={handleCancel}>Hủy</button>
      </div>

      <div className='flex justify-center font-semibold col-span-2 m-1'>
        <button className='bg-blue-500 text-white' onClick={() => handleUpdate(tablelist)}>Thêm món mới</button>
      </div>

      <div className='flex justify-center font-semibold col-span-2 m-1'>
        <button className='bg-indigo-500 text-white' onClick={() => openSwithTable(tablelist)}>Chuyển bàn</button>
      </div>
      <div className='flex justify-center col-span-2 m-1'>
        <Button className='bg-green-500 text-white font-semibold' type='success' onClick={showModal}>
          Thanh Toán
        </Button>
        <Modal
          title="Phương thức thanh toán"
          centered
          open={isModalPay}
          onOk={handleOk}
          onCancel={handleCancel2}
          footer={false}
        >
          <div className="w-full flex flex-col justify-start items-center space-y-1">
            <Collapse
              ghost
              items={[
                {
                  key: "1",
                  label: "Thanh toán bằng VNPAY",
                  children: (
                    <Form form={form} onFinish={onFinish}>
                      <Form.Item name="bankCode">
                        <Radio.Group className="radio-custom">
                          <Radio value="">Cổng thanh toán VNPAYQR</Radio>
                          <Radio value="VNPAYQR">
                            Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                          </Radio>
                          <Radio value="VNBANK">
                            Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                          </Radio>
                          <Radio value="INTCARD">
                            Thanh toán qua thẻ quốc tế
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item className="text-right">
                        <Button
                          type={"primary"}
                          htmlType={"submit"}
                          className="bg-primary"
                        >
                          Thanh toán
                        </Button>
                      </Form.Item>
                    </Form>
                  ),
                },
                {
                  key: "2",
                  label: "Thanh toán bằng tiền mặt",
                  children: (
                    <Button
                      onClick={submitPayment}
                      size={"large"}
                      className="w-full bg-main text-white"
                    >
                      Thanh toán bằng tiền mặt
                    </Button>
                  ),
                },
              ]}
            />
          </div>
        </Modal>
      </div>
    </div>
  </div></>
)
const ResOrder = ({ handleCancel, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalPay, setIsModalPay] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [payment, setPayment] = useState(null);
  const [switchTable, setSwitchTable] = useState(false)
  const [form] = Form.useForm();
  const tablelist = useSelector((state) => state.tablelist?.[0]);
  const tablebyorders = tablelist?.tablebyorders?.[0]
  const order = tablebyorders?.order;
  const order_details = order?.order_details;
  const customize = useSelector((state) => state.customize.darkMode)

  //them mon moi
  const handleUpdate = (index) => {
    dispatch(RemoveAllCart())
    index.TableByOrders[0].order.order_details.forEach(item => {
      let inDb = item.quantity;
      dispatch(AddCartUpdate({ quantity: item.quantity, ...item.Product, inDb }))
    });
    dispatch(AddTableList(index))
    navigate('/employee/menu/');
  }
  // modal phuong thuc thanh toan

  const showModal = () => {
    setIsModalPay(true);
  };
  const handleOk = () => {
    setIsModalPay(false);
  };
  const handleCancel2 = () => {
    setIsModalPay(false);
  };
  // xy ly thanh toan
  const onFinish = async (values) => {
    values = { ...values, amount: order.total }
    const data = await createPayment(values)
    setPayment(data)
    form.resetFields();
  };
  useEffect(() => {
    if (payment !== null) {
      window.location.href = String(payment);
    }
  }, [payment]);
  const submitPayment = async () => {
    const body = { payment_gateway: "Cash", date: moment(new Date()).format("YYYYMMDDHHmmss"), idOrder: order.id, idTable: tablelist.id }
    const data = await updatePayment(body)
    if (data) {
      navigate('/employee/payment-success/' + order.id)
    }
    dispatch(RemoveTableList())
  }

  //xu ly chuyen ban
  const openSwithTable = (index) => {
    navigate('/employee/select-table/' + tablelist.id + "/" + tablelist.tablebyorders[0].orderId);
  }
  const closeSwithTable = () => {
    setSwitchTable(false)
  }
  const completeOrder = async () => {
    const { orderId, tableId } = tablelist.tablebyorders[0];
    const { success, data } = await updateCompleteOrder({ orderId, tableId })
    if (success) {
      api.success({
        message: 'Thông báo',
        description: data
      });
      handleCancel()
    } else {
      api.info({
        message: 'Thông báo',
        description: data
      });
    }

  }
  return (
    <>
      {contextHolder}
      <Drawer
        title={<div className='flex justify-between items-center' >
          <span>{`Bàn số: ${tablelist ? tablelist.id : 0}`}</span>
          {tablelist?.id && <ButtonComponents className='text-white bg-secondaryColor border-none'
            content="Hoàn tất đơn hàng" onClick={completeOrder} />}
        </div>}
        placement="right"
        footer={<RenderFooter tablelist={tablelist} handleUpdate={handleUpdate}
          handleCancel={handleCancel} handleCancel2={handleCancel2} handleOk={handleOk}
          isModalPay={isModalPay} form={form} onFinish={onFinish} showModal={showModal}
          switchTable={switchTable} openSwithTable={openSwithTable} closeSwithTable={closeSwithTable}
          submitPayment={submitPayment} customize={customize} />}
        closable={false}
        onClose={handleCancel}
        open={open}
      >
        <div className="flex flex-col rounded-lg">
          {order_details && order_details.map((item, index) =>
            <div key={index}>
              <div className='flex item-center my-3'>
                <div className='flex-none h-16 w-15 mr-4 hover:bg-hoverColor'>
                </div>
                <div className='flex-grow'>
                  <div className='flex items-end justify-between'>
                    <span className={`text-lg ${customize ? "text-white" : "text-black"} overflow-hidden text-ellipsis whitespace-nowrap mb-1`}>{item.Product.name_product}</span>
                    <span className='text-main mb-3'>{formatGia(item.product.price)}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='font-medium text-slate-500 text-sm'>Số lượng:</span>
                    <span className=" font-medium text-slate-500 text-sm"> x{item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>

  )
}
export default ResOrder;