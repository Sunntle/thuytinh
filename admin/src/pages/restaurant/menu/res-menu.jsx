import { Col, Row, Divider, FloatButton, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from 'react';
import ResPayment from '../payment/res-payment';
import { getAllCate, getAllProduct } from '../../../services/api';

import { useDispatch } from 'react-redux';
import { AddCart } from '../../../redux/cartsystem/cartSystem';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';

const ResMenu = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const resCa = await getAllCate();
            const resProduct = await getAllProduct();
            setCategories(resCa);
            setProduct(resProduct);
        }
        fetchData();
    }, []);
    const filteredProducts = selectedCategory
        ? product.data.filter((product) => product.id_category === selectedCategory.id)
        : product.data;
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
                            slidesPerView={5}
                        >
                            {categories?.map((category, index) => (
                                <SwiperSlide key={index}>
                                    <div className="mx-10 w4/5">
                                        <Button onClick={() => setSelectedCategory(category)}>
                                            <p className='font-medium text-main text-lg'>{category.name_category}</p>
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
                        <Row className='w-full' gutter={[8, 16]}>
                            {filteredProducts?.map((product, index) => (
                                <Col md={8} xs={24} className='w-1/3 p-2 rounded-lg' key={index}>
                                    <div className="w-full pe-5">
                                        <div className='shadow-xl border-solid border-2 border-gray-300 px-4 py-2 rounded-lg' >
                                            <img className='h-44 w-60 rounded' src={product?.ImageProducts[0]?.url} />
                                            <div className='mt-3 font-medium'>{product.name_product}</div>
                                            <div className='flex justify-between items-center  '>
                                                <p className=' font-medium text-main text-lg'> {product.price} VNĐ</p>
                                                <div className=''>
                                                    <PlusOutlined onClick={() => dispatch(AddCart(product))} size={30} className='p-3 bg-main rounded-lg text-white' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
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
