import { Col, Row, Divider, FloatButton, Button, Pagination as PaginationMenu } from 'antd';
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
    console.log(product)
    const fetchData = async (page,_limit) => {
        const resCa = await getAllCate();
        const resProduct = await getAllProduct({_offset: _limit * (page - 1) ,_limit});
        setCategories(resCa);
        setProduct(resProduct);
    }
useEffect(() => {
    fetchData(page,12);
}, []);
const filteredProducts = selectedCategory
    ? product.data.filter((product) => product.id_category === selectedCategory.id)
    : product.data;
const handleChangePage = (e,p) =>{
    fetchData(e,p)
    setPage(e)
}
return (
    <div className='w-full p-10'>
        <FloatButton.BackTop />
        <Row gutter={[32, 16]}>
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
                                    <Button className='border-none text-main bg-orange-100 w-full max-w-full overflow-hidden' onClick={() => setSelectedCategory(category)}>
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
                    <Row gutter={[16, 16]}>
                        {filteredProducts?.map((product, index) => (
                            <Col md={6} sm={8} xs={12} className='rounded-lg' key={index}>
                                <div className='shadow-xl border-solid border border-gray-300 rounded-lg' >
                                    <img className='h-full w-full rounded-t-lg' src={product?.ImageProducts[0]?.url} />
                                    <div className='p-4'>
                                        <div className='font-medium'>{product.name_product}</div>
                                        <div className='flex justify-between items-center  '>
                                            <p className=' font-medium text-main text-lg'> {formatGia(product.price)}</p>
                                            <PlusOutlined onClick={() => dispatch(AddCart(product))} size={30} className='p-3 bg-main rounded-full text-white' />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {/* <PaginationMenu className='mt-2' current={page} defaultPageSize={12}
                        onChange={handleChangePage} total={product.total} /> */}
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
