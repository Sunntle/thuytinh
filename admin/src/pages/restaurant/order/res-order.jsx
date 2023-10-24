import React, { useEffect, useRef, useState } from 'react'
import "../payment/res-payment.css"
import { Button, Divider, Modal, message, Form, Radio, Drawer } from "antd"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, DecreaseCart, RemoveAllCart, RemoveCart, getTotal } from '../../../redux/cartsystem/cartSystem'
import { CloseOutlined } from '@ant-design/icons'
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { addOrder, createPayment, getTableId } from '../../../services/api'
import { RemoveTable } from '../../../redux/table/tableSystem'
import { AddTableList } from '../../../redux/table/listTableSystem'
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
    showModal}) => (
    <> <div className='Order-total border rounded-md'>
    <div className='tax'>
        <span>Thuế VAT:</span>
        <span className='float-right'>10%</span>
    </div>
    <div className='total'>
        <span className='font-medium text-lg'>Tổng tiền:</span>
        <span className='float-right text-lg text-main'>{tablelist?.order?.total} VNĐ</span>
    </div>
    <div className='grid grid-cols-4 mt-12'>
        <div className='flex justify-center font-semibold col-span-2 m-1'>
            <button className='bg-red-500 text-white' onClick={handleCancel}>Hủy</button>
        </div>

        <div className='flex justify-center font-semibold col-span-2 m-1'>
            <button className='bg-blue-500 text-white' onClick={() => handleUpdate(tablelist)}>Thêm món mới</button>
        </div>

        <div className='flex justify-center font-semibold col-span-2 m-1'>
            <button className='bg-indigo-500 text-white'>In bill</button>
        </div>
        <div className='flex justify-center col-span-2 m-1'>
            <Button className='bg-green-500 text-white font-semibold' type='success' onClick={showModal}>
                Thanh Toán
            </Button>
            <Modal footer={null} title="Chọn phương thức thanh toán" open={isModalPay} onOk={handleOk} onCancel={handleCancel2}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn phương thức thanh toán",
                            },
                        ]}
                        name="bankCode"
                    >
                        <Radio.Group>
                            <Radio value="">Cổng thanh toán VNPAYQR</Radio>
                            <Radio value="VNPAYQR">
                                Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                            </Radio>
                            <Radio value="VNBANK">
                                Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                            </Radio>
                            <Radio value="INTCARD">Thanh toán qua thẻ quốc tế</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type={"primary"} htmlType={"submit"}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </div>
    </div></>
 )
const ResOrder = ({ handleCancel, open }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalPay, setIsModalPay] = useState(false);
    const [payment, setPayment] = useState(null);
    const [form] = Form.useForm();
    const tablelist = useSelector((state) => state.tablelist);
    const order_details = tablelist?.order?.order_details;

    //them mon moi
    const handleUpdate = (index) => {
        index.order.order_details.forEach(item => {
            dispatch(AddCart({ quantity: item.quantity, ...item.Product }))
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
    

    return (
        <Drawer
            title={`Bàn số: ${tablelist.id}`} placement="right"
            footer={<RenderFooter tablelist={tablelist} handleUpdate={handleUpdate} handleCancel={handleCancel} handleCancel2={handleCancel2} handleOk={handleOk} isModalPay={isModalPay} form={form} onFinish={onFinish} showModal={showModal}/>}
            closable={false}
            onClose={handleCancel}
            open={open}
        >
           <div className=" dark:bg-darkModeBgBox flex flex-col rounded-lg">
                {order_details && order_details.map((item, index) =>
                    <div key={index}>
                        <div className='product-remove'>
                            <button className='float-right text-red-500' onClick={() => dispatch(RemoveCart(item))}><CloseOutlined /></button>
                        </div>
                        <div className='flex item-center my-3'>
                            <div className='flex-none h-16 w-15 mr-4 hover:bg-hoverColor'>
                                {/* <img className='border-solid border-2 border-main rounded-lg h-full w-full object-contain' src={item.product.ImageProducts.url} /> */}
                            </div>
                            <div className='flex-grow'>
                                <div className='flex items-end justify-between'>
                                    <span className='text-lg text-slade-500 overflow-hidden text-ellipsis whitespace-nowrap mb-1'>{item.Product.name_product}</span>
                                    <span className='text-main mb-3'>{item.Product.price} VNĐ</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='font-medium text-slate-500 text-lg text-sm'>Số lượng:</span>
                                    {/* <div className="flex flex-end justify-between items-center"> */}
                                    {/* <button className='border-solid border text-main' onClick={() => dispatch(DecreaseCart(item))}><HiMinus className="w-3 h-4 sm:w-4 sm:h-4 " /></button> */}
                                    <span className=" font-medium text-slate-500 text-lg text-sm"> x{item.quantity}</span>
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
