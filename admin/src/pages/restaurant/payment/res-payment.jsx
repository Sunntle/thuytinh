import React, { useEffect, useState } from 'react'
// import "./res-payment.css"
import { Button, Divider, Modal, Spin, message, } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, DecreaseCart, RemoveAllCart, RemoveCart, getTotal } from '../../../redux/cartsystem/cartSystem'
import { CloseOutlined } from '@ant-design/icons'
import { HiMinus, HiPlus } from "react-icons/hi2";
import { addOrder, updateOrder } from '../../../services/api'
import { useNavigate } from 'react-router-dom';
const img = 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=2000'

const ResPayment = () => {

    const { carts } = useSelector(state => state.cart)
    const total = useSelector(state => state.cart)
    const tablelist = useSelector((state) => state.tablelist);
    const navigate = useNavigate();
    console.log(tablelist)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotal());
    }, [total])
    const totalVAT = total.cartTotalAmount + (total.cartTotalAmount * 0.1);
    //Xu ly dat mon
    const submitOrderList = async (value) => {
        try {
            let res;
            const body = {
                orders: carts,
                total: totalVAT,
                customerName: "Admin",
                table: [tablelist.id]
            };
            res = await addOrder(body);
            dispatch(RemoveAllCart());

            // dispatch(RemoveTable());

            message.open({
                type: "success",
                content: "Đặt món thành công thành công!",
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Xu ly update order
    // const order_details = tablelist?.TableByOrders[0]?.order?.order_details;
    // const totalOld = tablelist?.total;

    const sumitUpdateOrder = async (value) => {
        try {
            let res;

            const body = {
                id_order: tablelist.TableByOrders[0].order.id,
                carts: carts,
                id_table: tablelist.id,
                total: totalVAT
            };
            console.log(body)
            res = await updateOrder(body);
            dispatch(RemoveAllCart());
            console.log(res)
            message.open({
                type: "success",
                content: "Cập nhật món mới thành công thành công!",
            });
            navigate('/employee/choosetable/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="border-solid border-2 border-main bg-orange-100 dark:bg-darkModeBgBox shadow-md flex flex-col gap-y-4 p-4 rounded-lg">
                <div>
                    <span className='font-medium text-lg'>Bàn số: </span>
                    <span className='font-medium text-main text-lg'>{tablelist.id}</span>
                </div>
                <Divider className='bg-main m-0' />
                {carts && carts.map((item, index) =>
                    <div key={index}>
                        <div className='product-remove'>
                            <button className='float-right text-red-500' onClick={() => dispatch(RemoveCart(item))}><CloseOutlined /></button>
                        </div>
                        <div className='flex item-center my-3'>
                            <div className='flex-none h-16 w-15 mr-4 hover:bg-hoverColor'>
                                <img className='border-solid border-2 border-main rounded-lg h-full w-full object-contain' src={item?.ImageProducts[0]?.url} />
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
                                        <span className="font-medium text-slate-500 text-lg mx-3 ">{item.quantity}</span>
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
                    <div className='total mt-3'>
                        <span className='font-medium text-lg'>Tổng tiền:</span>
                        <span className='float-right text-lg text-main'>{totalVAT} VNĐ</span>
                    </div>
                    <div className='grid grid-cols-2 mt-12'>
                        <div className='flex justify-center font-semibold col-span-1 m-1'>
                            <button className='bg-red-500 text-white' onClick={() => dispatch(RemoveAllCart())}>Hủy</button>
                        </div>

                        {tablelist.status_table > 0 ? (<div className='flex justify-center font-semibold col-span-1 m-1'>

                            <button className='bg-indigo-500 text-white' onClick={sumitUpdateOrder}>Cập nhật</button>

                        </div>) : (<div className='flex justify-center font-semibold col-span-1 m-1'>
                            <button className='bg-blue-500 text-white' onClick={submitOrderList}>Đặt món</button>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResPayment;
