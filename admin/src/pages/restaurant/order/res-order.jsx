import React, { useEffect, useRef, useState } from 'react'
import "../payment/res-payment.css"
import { Button, Divider, Modal, message, Form, Radio, Drawer, Collapse } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, AddCartUpdate, DecreaseCart, RemoveAllCart, RemoveCart, getTotal } from '../../../redux/cartsystem/cartSystem'
import { useNavigate } from 'react-router-dom';
import { addOrder, createPayment, getTableId } from '../../../services/api'
import { AddTableList } from '../../../redux/table/listTableSystem'
import { formatGia } from '../../../utils/format'
const img = 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000'

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
  closeSwithTable,
  openSwithTable,
  switchTable
}) => (<>
  <div className='Order-total border rounded-md'>
    <div className='tax'>
      <span>Thuế VAT:</span>
      <span className='float-right'>10%</span>
    </div>
    <div className='total'>
      <span className='font-medium text-lg'>Tổng tiền:</span>
      <span className='float-right text-lg text-main'>{formatGia(tablelist?.TableByOrders[0]?.order?.total)}</span>
    </div>
    <div className='grid grid-cols-4 mt-12'>
      <div className='flex justify-center font-semibold col-span-2 m-1'>
        <button className='bg-red-500 text-white' onClick={handleCancel}>Hủy</button>
      </div>

      <div className='flex justify-center font-semibold col-span-2 m-1'>
        <button className='bg-blue-500 text-white' onClick={() => handleUpdate(tablelist)}>Thêm món mới</button>
      </div>

      <div className='flex justify-center font-semibold col-span-2 m-1'>
        <button className='bg-indigo-500 text-white' onClick={openSwithTable}>Chuyển bàn</button>
      </div>
      <Modal title="Chọn bàn muốn chuyển" open={switchTable} onCancel={closeSwithTable}>

      </Modal>
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
                      size={"large"}
                      className="w-full bg-primary text-white"
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
  </div>
</>)
const ResOrder = ({ handleCancel, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalPay, setIsModalPay] = useState(false);
  const [payment, setPayment] = useState(null);
  const [switchTable, setSwitchTable] = useState(false);
  const [form] = Form.useForm();
  const tablelist = useSelector((state) => state.tablelist);
  const tablebyorders = tablelist?.TableByOrders[0]
  const order = tablebyorders?.order;
  const order_details = order?.order_details;


  //them mon moi
  const handleUpdate = (index) => {
    dispatch(RemoveAllCart())
    index.TableByOrders[0].order.order_details.forEach(item => {
      console.log(item.quantity)
      dispatch(AddCartUpdate({ quantity: item.quantity, ...item.Product }))
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
    values = { ...values, amount: 100000 }
    const data = await createPayment(values)
    setPayment(data)
    form.resetFields();
  };
  useEffect(() => {
    if (payment !== null) {
      window.location.href = String(payment);
    }
  }, [payment]);

  //xu ly chuyen ban
  const openSwithTable = () => {
    setSwitchTable(true)
  }
  const closeSwithTable = () => {
    setSwitchTable(false)
  }
  return (
    <Drawer
      title={`Bàn số: ${tablelist.id}`} placement="right"
      footer={<RenderFooter tablelist={tablelist} handleUpdate={handleUpdate} handleCancel={handleCancel} handleCancel2={handleCancel2} handleOk={handleOk} isModalPay={isModalPay} form={form} onFinish={onFinish} showModal={showModal} switchTable={switchTable} openSwithTable={openSwithTable} closeSwithTable={closeSwithTable} />}
      closable={false}
      onClose={handleCancel}
      open={open}
    >
      <div className=" dark:bg-darkModeBgBox flex flex-col rounded-lg">
        {order_details && order_details.map((item, index) =>
          <div key={index}>
            {/* <div className='product-remove'>
                            <button className='float-right text-red-500' onClick={() => dispatch(RemoveCart(item))}><CloseOutlined /></button>
                        </div> */}
            <div className='flex item-center my-3'>
              <div className='flex-none h-16 w-15 mr-4 hover:bg-hoverColor'>
                {/* <img className='border-solid border-2 border-main rounded-lg h-full w-full object-contain' src={item.product.ImageProducts.url} /> */}
              </div>
              <div className='flex-grow'>
                <div className='flex items-end justify-between'>

                  <span className='text-lg text-slade-500 overflow-hidden text-ellipsis whitespace-nowrap mb-1'>{item.Product.name_product}</span>
                  <span className='text-main mb-3'>{formatGia(item.Product.price)}</span>

                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-medium text-slate-500  text-sm'>Số lượng:</span>
                  {/* <div className="flex flex-end justify-between items-center"> */}
                  {/* <button className='border-solid border text-main' onClick={() => dispatch(DecreaseCart(item))}><HiMinus className="w-3 h-4 sm:w-4 sm:h-4 " /></button> */}
                  <span className=" font-medium text-slate-500  text-sm"> x{item.quantity}</span>
                  {/* <button className='border-solid border text-main' onClick={() => dispatch(AddCart(item))}><HiPlus className="w-3 h-3 sm:w-4 sm:h-4  " /></button> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
        <Divider className='bg-main my-5' />
      </div>
    </Drawer>
  )
}
export default ResOrder;
