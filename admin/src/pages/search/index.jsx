import { Col, Pagination, Row, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../../components/spinner";
import { AddCart } from "../../redux/cartsystem/cartSystem";
import { getAllCate, getAllMaterial, getAllProduct } from "../../services/api";
import { formatGia } from "../../utils/format";
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (_limit = 6, _offset = 0) => {
      try {
        const kw = searchParams.get("keyword");
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
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback((page, pagesize = 5) => {
    fetchData(pagesize, pagesize * (page - 1));
  },[fetchData]);

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
          className="mySwiper"
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
                  <img
                    className="w-full mb-3"
                    src={category.thumbnail}
                    alt=""
                  />
                  <h6 className="font-semibold">{category.name_category}</h6>
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

      //comment something
    return (
      <div className="my-3">
        <Title level={4} className="font-semibol">
          Món ăn: <span className="text-main">{product?.total}</span>
        </Title>
        <Row gutter={[10, 10]}>
          {product?.data.map((el, index) => (
            <Col md={4} sm={8} xs={12} className="rounded-lg" key={index}>
              <div className="shadow-xl border-solid border border-gray-300 rounded-lg min-h-[250px] w-auto">
                <img
                  className="h-full w-full rounded-t-lg"
                  src={el?.ImageProducts[0]?.url}
                />
  
                <div className="p-4 flex flex-col">
                  <div className="font-medium">{el.name_product}</div>
                  <div className="text-xs mt-2 text-slate-500">
                    Số lượng : {el.amount}
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
                    <PlusOutlined
                      onClick={() => dispatch(AddCart(el))}
                      className="p-2 bg-main rounded-full text-white"
                    />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-right">
          <Pagination
            responsive={true}
            defaultCurrent={1}
            total={product?.total}
            onChange={handlePageChange}
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
          <div className="">
          {material?.data.map((el, index) => (
            <div key={index} className="flex items-center gap-5 pb-4">
              <div>
                {console.log(el)}
                <img
                  className="w-full"
                  style={{ maxWidth: "180px" }}
                  src={el.image}
                  alt=""
                />
              </div>
              <div>
                <Link
                  to={`/employee/menu?material=${el.id}`}
                  className="font-semibold text-xl hover:text-main"
                >
                  {el.name_material}
                </Link>
                <p className="text-gray-500  my-2">
                  Số lượng: {el.amount} {el.unit}
                </p>
                <p className="text-main text-lg">{formatGia(el.Warehouses[0]?.price_import)}</p>
              </div>
            </div>
          ))}
          </div>
          <div className="text-right">
            <Pagination
              responsive={true}
              defaultCurrent={1}
              total={material?.total}
              onChange={handlePageChange}
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
