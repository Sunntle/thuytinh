import { useEffect } from 'react'
// import "./res-payment.css"
import { Button, Divider, message } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, DecreaseCart, RemoveAllCart, RemoveCart, getTotal } from '../../../redux/cartsystem/cartSystem'
import { DeleteOutlined } from '@ant-design/icons'
import { HiMinus, HiPlus } from "react-icons/hi2";
import { addOrder, updateOrder } from '../../../services/api'
import { useNavigate } from 'react-router-dom';
import { formatGia } from '../../../utils/format'
import { RemoveTableList } from '../../../redux/table/listTableSystem'

const ResPayment = () => {

    const { carts } = useSelector(state => state.cart)
    const total = useSelector(state => state.cart)
    const tablelist = useSelector((state) => state.tablelist);
    const staff = useSelector((state) => state.account)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotal());
    }, [total])
    //Xu ly chon ban
    const chooseTable = () => {
        navigate("/employee/choosetable")
    }
    //Xu ly dat mon
    const submitOrderList = async (value) => {
        try {
            let res;
            const body = {
                orders: carts,
                total: total.cartTotalAmount,
                customerName: "Nv_" + staff.user.name,
                table: [tablelist.id],
                id_employee: staff.user.id
            };
            res = await addOrder(body);
            dispatch(RemoveAllCart(false));
            dispatch(RemoveTableList());
            res.success && navigate("/employee/choosetable")
            message.open({
                type: res.success ? "success" : "info",
                content: res.success ? "Đặt món thành công!" : res.data,
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Xu ly update order
    const sumitUpdateOrder = async (value) => {
        try {
            let res;

            const body = {
                id_order: tablelist.tablebyorders[0].order.id,
                carts: carts,
                id_table: tablelist.id,
                total: total.cartTotalAmount
            };
            res = await updateOrder(body);
            if (res.success === false) {
                message.open({
                    type: "info",
                    content: res.message
                });
            } else {
                dispatch(RemoveAllCart(true));
                dispatch(RemoveTableList());
                message.open({
                    type: "success",
                    content: "Cập nhật món mới thành công thành công!",
                });
                navigate('/employee/choosetable/');
            }

        } catch (err) {
            console.log(err);
        }
    }
    const canCelOrder = () => {
        dispatch(RemoveAllCart());
        dispatch(RemoveTableList());
        navigate('/employee/choosetable/');
    }
    return (
        <>
            <div className="border-solid border-2 border-main bg-orange-100 dark:bg-darkModeBgBox shadow-md flex flex-col gap-y-4 p-4 rounded-lg">
                {tablelist ? (
                    <div>
                        <span className='font-medium text-lg'>Bàn số: </span>
                        <span className='font-medium text-main text-lg'>{tablelist.id}</span>
                    </div>
                ) : (
                    <div>
                        <span className='font-medium text-main text-lg'>Chưa chọn bàn</span>
                    </div>
                )}
                {tablelist && <Divider className='bg-main m-0' />}
                {carts && carts.map((item, index) =>
                    <div key={index}>
                        <div className='flex items-center my-3'>
                            <div className='flex items-center h-16 w-15 mr-1 hover:bg-hoverColor'>
                                <img className=' rounded-lg  h-full w-full  object-contain ' src={item?.imageproducts?.[0]?.url} />
                            </div>
                            <div className='flex-grow'>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-slade-500 overflow-hidden break-words mb-1'>{item.name_product}</span>
                                    <span className='text-main text-sm mb-3'>{(formatGia(item.price))}</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='product-remove pe-2'>
                                        <span className='text-orange-500 cursor-pointer' onClick={() => dispatch(RemoveCart(item))}><DeleteOutlined /></span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className='rounded-full bg-orange-500 p-1 cursor-pointer' onClick={() => dispatch(DecreaseCart(item))}><HiMinus className="text-white w-3 h-4 sm:w-4 sm:h-4 " /></span>
                                        <span className="font-medium text-lg mx-3 ">{item.quantity}</span>
                                        <span className='rounded-full bg-orange-500 p-1 cursor-pointer' onClick={() => dispatch(AddCart(item))}><HiPlus className="text-white w-3 h-3 sm:w-4 sm:h-4 " /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {tablelist && <Divider className='bg-main my-5' />}
                <div className='Order-total border rounded-md'>
                    <div className='tax'>
                        <span>Thuế VAT:</span>
                        <span className='float-right'>10%</span>
                    </div>
                    <div className='total mt-3'>
                        <span className='font-medium text-lg'>Tổng tiền:</span>
                        <span className='float-right text-lg text-main'>{formatGia(total.cartTotalAmount * 1.1) || 0}</span>
                    </div>
                    {tablelist ? (
                        <div className='grid grid-cols-2 mt-12'>
                            <div className='flex justify-center font-semibold col-span-1 m-1'>
                                <div className='flex items-center justify-center rounded bg-red-500 hover:bg-red-400 cursor-pointer text-white h-[40px] w-full' onClick={canCelOrder}>Hủy</div>
                            </div>

                            {tablelist.status_table > 0 ? (<div className='flex justify-center font-semibold col-span-1 m-1'>

                                <Button className={`bg-indigo-500 text-white ${carts.length > 0 ? "" : "bg-indigo-300 pointer-events-none"}`} onClick={sumitUpdateOrder}>Cập nhật</Button>

                            </div>) : (<div className='flex justify-center font-semibold col-span-1 m-1'>
                                <div className={`flex items-center justify-center rounded text-white hover:bg-blue-300 cursor-pointer h-[40px] w-full ${carts.length > 0 ? "bg-blue-500" : "bg-blue-300 pointer-events-none"}`} onClick={submitOrderList}>Đặt món</div>
                            </div>)}
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 mt-12'>
                            <div className='flex justify-center font-semibold col-span-2 m-1'>
                                <Button className='bg-green-500 text-white' onClick={chooseTable}>Chọn bàn</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default ResPayment;
