import { Col, Pagination, Row, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../../components/spinner";
import { getAllCate, getAllMaterial, getAllProduct } from "../../services/api";
import { formatGia, truncateString } from "../../utils/format";
import ImageComponent from "../../components/image"
import { useMemo } from "react";
import { useSelector } from "react-redux";
const { Title } = Typography;

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.account)
  const kw = useMemo(()=>searchParams.get("keyword"),[searchParams]);
  const fetchData = useCallback(
    async (_limit = 6, _offset = 0) => {
      try { 
        const [res, resMaterial, resCategory] = await Promise.all([
          getAllProduct({
            q: kw,
            _limit: _limit,
            _offset: _offset,
          }),
          getAllMaterial({
            q: kw,
            _limit: _limit,
            _offset: _offset,
          }),
          getAllCate({
            q: kw,
            _limit: _limit,
            _offset: _offset,
          }),
        ]);
        setProduct(res);
        setMaterial(resMaterial);
        setCategory(resCategory);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );
  const fetchProduct = useCallback(async(_limit = 6, _offset = 0)=>{
    const res = await getAllProduct({
      q: kw,
      _limit: _limit,
      _offset: _offset,
    })
    setProduct(res);
  },[kw])

  const fetchMaterial = useCallback(async(_limit = 6, _offset = 0)=>{
    const res = await getAllMaterial({
      q: kw,
      _limit: _limit,
      _offset: _offset,
    })
    setMaterial(res);
  },[kw])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback((page, pagesize = 5, type) => {
    if(type == 'product') fetchProduct(pagesize, pagesize * (page - 1))
    if(type == 'material') fetchMaterial(pagesize, pagesize * (page - 1))
  },[fetchMaterial, fetchProduct]);
  const renderCategory = () => {
    if (category?.length < 1)
      return <h4 className="text-gray-600 pb-3">Không có danh mục phù hợp</h4>;
    return (
      <div className="my-3">
        <Title level={4} className="font-semibol">
          Danh mục: <span className="text-main">{category?.total}</span>
        </Title>
        <Swiper
          speed={1500}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={20}
          className="mySwiper py-5"
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {category?.map((category, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="px-5 py-3 xl:px-10 xl:py-6  border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 text-center">
                  <ImageComponent
                    className="w-full mb-3"
                    src={category.thumbnail}
                    alt=""
                  />
                  <Link to={`/employee/menu?category=${category.id}`} className="font-semibold text-xl hover:text-main">{category.name_category}</Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };
  const renderProduct = () => {
    if (product?.total === 0)
      return (
        <h4 className=" text-gray-600  pb-3">Không có sản phẩm phù hợp</h4>
      );
    return (
      <div className="my-3">
        <Title level={4} className="font-semibol">
          Món ăn: <span className="text-main">{product?.total}</span>
        </Title>
        <Row gutter={[10, 10]} className="py-5">
          {product?.data.map((el, index) => (
            <Col md={4} sm={8} xs={12} className="rounded-lg" key={index}>
              <div className="shadow-xl border-solid border border-gray-300 rounded-lg min-h-[250px] w-auto">
                <ImageComponent
                  className="h-full w-full rounded-t-lg"
                  src={el?.imageproducts[0]?.url}
                  list={el?.imageproducts}
                />
  
                <div className="p-4 flex flex-col">
                  <Link to={user?.user.role === "R4" ? "/admin/product" :`/employee/menu?product=${category.id}`} className="font-medium text-xl hover:text-main">{truncateString(el.name_product, 10)}</Link>
                  <div className="text-xs mt-2 text-slate-500">
                  {el.amount >= 1 ? ('Số lượng : ' + el.amount) : (el.amount === 0.5 ? ('Số lượng : vô hạn') : ('Sản phẩm hết hàng!'))}
                  </div>
                  <div className="flex justify-between items-center">
                    {el.discount > 0 ? (
                      <div className="product-price flex justify-between items-center">
                        <p className=" font-medium text-main text-lg mr-1">
                          {" "}
                          {formatGia(el.price - (el.price * el.discount) / 100)}
                        </p>
                        <p className=" font-medium text-slate-300 line-through text-xs ">
                          {" "}
                          {formatGia(el.price)}
                        </p>
                      </div>
                    ) : (
                      <p className=" font-medium text-main text-lg mr-1">
                        {formatGia(el.price)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-right">
          <Pagination
            pageSize={6}
            responsive={true}
            defaultCurrent={1}
            total={product?.total}
            onChange={(page, pagesize)=>handlePageChange(page, pagesize, 'product')}
          />
        </div>
      </div>
    );
  };
  const renderMaterial = () => {
    if (material?.total === 0)
      return (
        <h4 className=" text-gray-600 pb-3">Không có nguyên liệu phù hợp</h4>
      );
    return (
      <div>
        <div className="my-3">
          <Title level={4} className="font-semibold">
            Nguyên liệu: <span className="text-main">{material?.total}</span>
          </Title>
          <div className="py-5">
          {material?.data.map((el, index) => (
            <div key={index} className="flex items-center gap-5 pb-4">
              <div>
                <ImageComponent
                  className="w-full max-w-[180px]"
                  src={el.image}
                />
              </div>
              <div>
                <Link
                  to={user?.user?.role === "R4"? "/admin/material" :"/employee/renvenue"}
                  className="font-semibold text-xl hover:text-main"
                >
                  {el.name_material}
                </Link>
                <p className="text-gray-500  my-2">
                  Số lượng: {el.amount} {el.unit}
                </p>
                <p className="text-main text-lg">{formatGia(el.warehouses[0]?.price_import)}</p>
              </div>
            </div>
          ))}
          </div>
          <div className="text-right">
            <Pagination
              responsive={true}
              pageSize={6}
              defaultCurrent={1}
              total={material?.total}
              onChange={(page, pagesize)=>handlePageChange(page, pagesize, 'material')}
            />
          </div>
        </div>
      </div>
    );
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="my-7 px-5">
      <Title level={3} className="font-semibold">
        Phù hợp với kết quả tìm kiếm: {product?.total + material?.total}
      </Title>
      {renderCategory()}
      {renderProduct()}
      {renderMaterial()}
    </div>
  );
}

export default SearchPage;
