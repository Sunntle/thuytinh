import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Divider, FloatButton, Pagination as PaginationMenu, Row, message } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { AddCart, setErr, setSuccess } from '../../../redux/cartsystem/cartSystem';
import { getAllCate, getAllProduct } from '../../../services/api';
import { formatGia } from '../../../utils/format';
import ResPayment from '../payment/res-payment';
import Spinner from '../../../components/spinner';
import ImageComponent from "../../../components/image"
const ResMenu = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const warning = useSelector(state => state.cart.err);
    const success = useSelector(state => state.cart.isSuccess);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");
    const [loading, setLoading] = useState(true);

    const handleSetCategory = async (id) => {
        setLoading(true);
        try {
            await fetchData(page, 12, id);
            navigate({
                search: createSearchParams(`category=${id}`).toString(),
            }, { replace: true });
        } catch (error) {
            console.error('Lỗi khi xử lý danh mục:', error);
            dispatch(setErr('Lỗi khi xử lý danh mục.'));
        } finally {
            setLoading(false);
        }
        // navigate({
        //     search: createSearchParams(`category=${id}`).toString(),
        // }, { replace: true });
    }
    const fetchData = useCallback(async (page, _limit) => {
        let query = { _offset: _limit * (page - 1), _limit }
        if (selectedCategory) {
            query = { _id_category: `eq_${selectedCategory}`, ...query }
        }
        try {
            const [resCa, resProduct] = await Promise.all([getAllCate(), getAllProduct(query)]);
            setCategories(resCa);
            setProduct(resProduct);
        } catch {
            console.error('Lỗi khi lấy dữ liệu:', error);
            dispatch(setErr('Lỗi khi lấy dữ liệu.'));
        } finally {
            setLoading(false);
        }

    }, [selectedCategory])

    const handleAddToCart = (product) => {
        try{
             dispatch(AddCart(product));

        } catch{
            messageApi.open({
                type: "error",
                content: "Đặt món thất bại",
              });
        }
        
    }

    useEffect(() => {
        fetchData(page, 12);
    }, [selectedCategory, page, fetchData]);

    const handleChangePage = (e, p) => {
        fetchData(e, p)
        setPage(e)
    }

    const title = useMemo(() => {
        if (selectedCategory && categories.length > 0) {
            const result = categories?.find(i => i.id == selectedCategory);
            return result.name_category;
        }
        return 'Tất cả sản phẩm'
    }, [categories, selectedCategory])

    useEffect(() => {
        if (warning) {
            messageApi.warning(warning);
            dispatch(setErr(null))
        }
        if(success){
            messageApi.success(success);
            dispatch(setSuccess(null))
        }
    }, [dispatch, messageApi, warning,success]);

    return (
        <div className='w-full p-10'>
            {loading ? (<Spinner />) : (
                <>
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
                                                <Button className='border-none text-main bg-orange-100 w-full max-w-full lg:w-full lg:max-w-full overflow-hidden' onClick={() => handleSetCategory(category.id)}>
                                                    {category.name_category}
                                                </Button>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='recent_order w-full   mt-4'>
                                <div className='flex justify-center py-1'>
                                    <Divider><span className='font-medium text-main text-lg'>{title}</span></Divider>
                                </div>
                                <Row gutter={[32, 24, 16, 8]}>
                                    {loading ? (<Spinner />) : (
                                        <>
                                            {product?.data?.length > 0 && product?.data?.map((product, index) => (
                                                <Col lg={8} md={8} sm={12} xs={12} className='rounded-lg' key={index}>
                                                    {product.discount > 0 ? (
                                                        <Badge.Ribbon text={`${product.discount}%`} color='rgb(239 68 68)'>
                                                            <div className='shadow-xl border-solid border border-gray-300 rounded-lg min-h-[230px] w-auto' >
                                                                <ImageComponent className='h-full w-full rounded-t-lg' src={product?.imageproducts[0]?.url} list={product?.imageproducts}/>
                                                                <div className='p-4 flex flex-col'>
                                                                    <div className='font-medium lg:text-xs xl:text-sm'>{product.name_product}</div>
                                                                    <div className='text-xs mt-2 text-slate-500'>{product.amount >= 1 ? ('Số lượng : ' + product.amount) : (product.amount === 0.5 ? ('Số lượng : vô hạn') : ('Sản phẩm hết hàng!'))}</div>
                                                                    <div className='flex justify-between items-center mt-2'>
                                                                        <div className='product-price flex lg:flex-col xl:flex-row xl:justify-between xl:items-center'>
                                                                            <p className=' font-medium text-main text-lg mr-1 lg:order-2 xl:order-none'> {(formatGia(product.price - (product.price * product.discount / 100)))}</p>
                                                                            <p className=' font-medium text-slate-300 line-through text-xs lg:order-1 xl:order-none'> {(formatGia(product.price))}</p>
                                                                        </div>
                                                                        <PlusOutlined onClick={() => handleAddToCart({ ...product, price: product.price - (product.price * product.discount / 100) })} size={30} className='p-1 bg-main rounded-full text-white' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Badge.Ribbon>
                                                    ) : (
                                                        <div className='shadow-xl border-solid border border-gray-300 rounded-lg min-h-[230px] h-auto w-auto'>
                                                            <ImageComponent className='h-full w-full rounded-t-lg' src={product?.imageproducts[0]?.url} list={product?.imageproducts}/>
                                                            <div className='p-4 flex lg:min-h-[124px] xl:min-h-0 flex-col'>
                                                                <div className='font-medium lg:text-xs xl:text-sm'>{product.name_product}</div>
                                                                <div className='text-xs text-slate-500 mt-2'>{product.amount >= 1 ? ('Số lượng : ' + product.amount) : (product.amount === 0.5 ? ('Số lượng : vô hạn') : ('Sản phẩm hết hàng!'))}</div>
                                                                <div className='flex justify-between items-center'>
                                                                    <p className=' font-medium text-main text-lg mt-1'> {(formatGia(product.price))}</p>
                                                                    <PlusOutlined onClick={() => handleAddToCart(product)} size={30} className='p-1 bg-main rounded-full text-white' />
                                                                </div>
                                                            </div>
                                                        </div>)}
                                                </Col>

                                            ))}
                                        </>
                                    )}
                                </Row>
                                <PaginationMenu className='mt-2 float-right' current={page} defaultPageSize={12}
                                    onChange={handleChangePage} total={product.total || 0} />
                            </div>
                        </Col>
                        <Col xs={24} lg={8} className='flex flex-col gap-y-4'>
                            <ResPayment />
                        </Col>
                    </Row>
                </>
            )}

        </div>
    )
}

export default ResMenu;
