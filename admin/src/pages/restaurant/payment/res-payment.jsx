import React, { useEffect, useRef, useState } from 'react'
import "./res-payment.css"
import { Col, Row, Tabs, Button, Divider, Card, Modal, Spin, message, FloatButton } from "antd"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, DecreaseCart, RemoveAllCart, RemoveCart, getTotal } from '../../../redux/cartsystem/cartSystem'
import { CloseOutlined } from '@ant-design/icons'
import { HiMinus, HiPlus } from "react-icons/hi2";
const img = 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000'

const ResPayment = () => {

    const { carts } = useSelector(state => state.cart)
    const total = useSelector(state => state.cart)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotal());
    }, [total])
    // modal phuong thuc thanh toan
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // modal cho thanh toan
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handle = () => {
        setIsModalOpen2(false);
    };
    const handlePay = () => {
        setLoading(true);
        setIsModalOpen2(true);

    };
    const handleAccept = () => {
        handleTime()
        setConfirmLoading(true);
        setTimeout(() => {
            setIsModalOpen2(false);
            messageApi.open({
                type: 'success',
                content: 'Thanh toán thành công!!!',
                className: 'custom-class',
                duration: 5,
            });
        }, 5000);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 5100);
    };
    const handleTime = () => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }
    return (
        <>
            {carts.length > 0 && (
                <div className="border-solid border-2 border-main bg-orange-50 shadow-md flex flex-col gap-y-4 p-4 rounded-lg">
                    <div>
                        <span className='font-medium text-lg'>Bàn số: </span>
                        <span className='font-medium text-main text-lg'>1</span>
                    </div>
                    <Divider className='bg-main m-0' />
                    {carts && carts.map((item, index) =>
                        <div key={index}>
                            <div className='product-remove'>
                                <button className='float-right text-red-500' onClick={() => dispatch(RemoveCart(item))}><CloseOutlined /></button>
                            </div>
                            <div className='flex item-center my-3'>
                                <div className='flex-none h-16 w-15 mr-4 hover:bg-hoverColor'>
                                    <img className='border-solid border-2 border-main rounded-lg h-full w-full object-contain' src={item.imageUrls} />
                                </div>
                                <div className='flex-grow'>
                                    <div className='flex items-end justify-between'>
                                        <span className='text-lg text-slade-500 overflow-hidden text-ellipsis whitespace-nowrap mb-1'>{item.name_product}</span>
                                        <span className='text-main mb-3'>{item.price} VNĐ</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <span>x{item.quantity}</span>
                                        <div className="flex justify-between items-center">
                                            <button className='border-solid border text-main' onClick={() => dispatch(DecreaseCart(item))}><HiMinus className="w-3 h-4 sm:w-4 sm:h-4 " /></button>
                                            <span className="font-medium text-slate-500 text-lg mx-3 text-sm">{item.quantity}</span>
                                            <button className='border-solid border text-main' onClick={() => dispatch(AddCart(item))}><HiPlus className="w-3 h-3 sm:w-4 sm:h-4  " /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Divider className='bg-main my-5' />
                    <div className='Order-total border rounded-md'>
                        <div className='tax'>
                            <span>Thuế VAT:</span>
                            <span className='float-right'>10%</span>
                        </div>
                        <div className='total m-3'>
                            <span className='font-medium text-lg'>Tổng tiền:</span>
                            <span className='float-right text-lg text-main'>{total.cartTotalAmount + (total.cartTotalAmount * 0.1)} VNĐ</span>
                        </div>
                        <div className='grid grid-cols-4 mt-12'>
                            <div className='flex justify-center font-semibold col-span-2 m-1'>
                                <button className='bg-red-500 text-white' onClick={() => dispatch(RemoveAllCart())}>Hủy</button>
                            </div>
                            <div className='flex justify-center font-semibold col-span-2 m-1'>
                                <button className='bg-blue-500 text-white'>Đặt món</button>
                            </div>
                            <div className='flex justify-center font-semibold col-span-2 m-1'>
                                <button className='bg-indigo-500 text-white'>In bill</button>
                            </div>
                            <div className='flex justify-center col-span-2 m-1'>
                                <Button className='bg-green-500 text-white font-semibold' type='success' onClick={showModal}>
                                    Thanh Toán
                                </Button>
                                <Modal footer={null} title="Chọn phương thức thanh toán" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <div className='mx-9 '>
                                        <Button className=' bg-main text-white font-semibold w-96 my-3 hover:bg-borderSecondaryColor' type='success' onClick={handlePay}>
                                            THANH TOÁN BẰNG TIỀN MẶT
                                        </Button>
                                        <Modal footer={null} title="" open={isModalOpen2} onOk={handleOk} onCancel={handle}>
                                            <div className="example grid justify-items-center py-8">
                                                {contextHolder}
                                                {loading ? <p className='text-lg mb-10 uppercase font-semibold'>Chờ thanh toán</p> : <p className='text-lg mb-10 uppercase font-semibold'>Thanh toán thành công</p>}
                                                {loading ? <Spin size="large" /> : <AiOutlineCheckCircle className="text-green-500" size={70} />}

                                            </div>
                                            <div className='grid grid-cols-4 pt-8'>
                                                <div className='btn-cancel col-span-2 grid justify-items-center'>
                                                    <Button className=' bg-red-400 text-white font-semibold ' type='waring' onClick={handle}>
                                                        Hủy
                                                    </Button>
                                                </div>
                                                <div className='btn-accept col-span-2 grid justify-items-center'>
                                                    <Button className=' bg-emerald-500 text-white font-semibold mb-3 ' type='success' confirmloading={confirmLoading} onClick={handleAccept}>
                                                        Xác nhận thanh toán
                                                    </Button>

                                                </div>
                                            </div>
                                        </Modal>
                                        <Button className='bg-main font-semibold text-white w-96 my-3 hover:bg-borderSecondaryColor' type='success' onClick={handlePay}>
                                            THANH TOÁN BẰNG THẺ
                                        </Button>
                                        <Button className=' bg-main font-semibold text-white w-96 my-3 hover:bg-borderSecondaryColor' type='success' onClick={handlePay}>
                                            THANH TOÁN BẰNG CHUYỂN KHOẢN
                                        </Button>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ResPayment;
