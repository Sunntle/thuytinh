import { Col, Row, Divider, FloatButton, Button, Pagination as PaginationMenu, Badge ,notification} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from 'react';
import ResPayment from '../payment/res-payment';
import { getAllCate, getAllProduct } from '../../../services/api';
import { useDispatch } from 'react-redux';
import { AddCart } from '../../../redux/cartsystem/cartSystem';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { formatGia } from '../../../utils/format';

const ResMenu = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [api, contextHolder] = notification.useNotification();
    console.log(product)
    const fetchData = async (page, _limit) => {
        const resCa = await getAllCate();
        const resProduct = await getAllProduct({ _offset: _limit * (page - 1), _limit });
        setCategories(resCa);
        setProduct(resProduct);
    }
    useEffect(() => {
        fetchData(page, 12);
    }, []);
    const filteredProducts = selectedCategory
        ? product.data.filter((product) => product.id_category === selectedCategory.id)
        : product.data;
    const handleChangePage = (e, p) => {
        fetchData(e, p)
        setPage(e)
    }
    // xu ly quantity
    const handleAddCarts = (item) => {
        console.log(item)
        if(item.amount === 0){
            api.info({
                message: 'Thông báo!!!',
                description:
                  'Sản phẩm hết hàng!!!',
              });
        }else{
            dispatch(AddCart(item))
        }
    }
    return (
        <div className='w-full px-5 py-10'>
            {contextHolder}
            <FloatButton.BackTop />
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <div className='save-product w-full mt-4'>
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            pagination={{ clickable: true }}
                            slidesPerView={4}
                        >
                            {categories?.map((category, index) => (
                                <SwiperSlide key={index}>
                                    <div className="mx-10">
                                        <Button className='border-none text-main bg-orange-100 w-full max-w-full lg:w-full lg:max-w-full overflow-hidden' onClick={() => setSelectedCategory(category)}>
                                            {category.name_category}
                                        </Button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='recent_order w-full   mt-4'>
                        {selectedCategory && (
                            <div className='flex justify-center py-3'>
                                <Divider><span className='font-medium text-main text-lg'>{selectedCategory.name_category}</span></Divider>
                            </div>
                        )}
                        <Row gutter={[32, 24, 16, 8 ]}>
                            {filteredProducts?.map((product, index) => (
                                <Col lg={8} md={8} sm={12} xs={12} className='rounded-lg' key={index}>
                                    {product.discount > 0 ? (
                                        <Badge.Ribbon text={`${product.discount}%`} color='red'>
                                            <div className='shadow-xl border-solid border border-gray-300 rounded-lg min-h-[230px] w-auto' >
                                                <img className='h-full w-full rounded-t-lg' src={product?.ImageProducts[0]?.url} />
                                                <div className='p-4 flex flex-col'>
                                                    <div className='font-medium'>{product.name_product}</div>
                                                    <div className='text-xs mt-2 text-slate-500'>Số lượng : {product.amount}</div>
                                                    <div className='flex justify-between items-center mt-2'>
                                                        <div className='product-price flex justify-between items-center'>                                                       
                                                            <p className=' font-medium text-main text-lg mr-1'> {(formatGia(product.price - (product.price * product.discount / 100)))}</p>
                                                            <p className=' font-medium text-slate-300 line-through text-xs '> {(formatGia(product.price))}</p>  
                                                        </div>
                                                        {/* <PlusOutlined onClick={() => dispatch(AddCart(product))} size={30} className='p-1 bg-main rounded-full text-white' /> */}
                                                        <PlusOutlined onClick={() => handleAddCarts(product)} size={30} className='p-1 bg-main rounded-full text-white' />
                                                    </div>
                                                </div>
                                            </div>
                                        </Badge.Ribbon>
                                    ) : (
                                        <div className='shadow-xl border-solid border border-gray-300 rounded-lg min-h-[230px] h-auto w-auto'>
                                            <img className='h-full w-full rounded-t-lg' src={product?.ImageProducts[0]?.url} />
                                            <div className='p-4 flex flex-col'>
                                                <div className='font-medium lg:text-xs xl:text-sm'>{product.name_product}</div>
                                                <div className='text-xs text-slate-500 mt-2'>Số lượng : {product.amount}</div>
                                                <div className='flex justify-between items-center'>
                                                    <p className=' font-medium text-main text-lg mt-1'> {(formatGia(product.price))}</p>
                                                    <PlusOutlined onClick={() => handleAddCarts(product)} size={30} className='p-1 bg-main rounded-full text-white' />
                                                </div>
                                            </div>
                                        </div>)}
                                </Col>

                            ))}
                        </Row>
                        {/* <PaginationMenu className='mt-2' current={page} defaultPageSize={12}
                        onChange={handleChangePage} total={filteredProducts} /> */}
                    </div>
                </Col>
                <Col xs={24} lg={8} className='flex flex-col gap-y-4'>
                    <ResPayment />
                </Col>
            </Row>
        </div>
    )
}

export default ResMenu;
