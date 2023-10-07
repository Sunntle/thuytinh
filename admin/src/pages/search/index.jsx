import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllMaterial, getAllProduct } from "../../services/api";
import Spinner from "../../components/spinner";
import { Col, Pagination, Row } from "antd";
import { formatGia, truncateString } from "../../utils/format";
import { useDispatch } from "react-redux";
import { AddCart } from "../../redux/cartsystem/cartSystem";
import ButtonComponents from "../../components/button";
import { PlusOutlined } from "@ant-design/icons";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (_limit = 5, _offset = 0) => {
      const kw = searchParams.get("keyword");
      const res = await getAllProduct({
        q: kw,
        _limit: _limit,
        _offset: _offset,
      });
      const resMaterial = await getAllMaterial({
        q: kw,
        _limit: _limit,
        _offset: _offset,
      });
      setMaterial(resMaterial);
      setProduct(res);
      setLoading(false);
    },
    [searchParams]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handlePageChange = (page, pagesize = 5) => {
    fetchData(pagesize, pagesize * (page - 1));
  };
  const renderProduct = () => {
    if (product.total === 0) return <h4>Không có sản phẩm phù hợp</h4>;
    return (
      <div className="my-3">
        <h4 className="text-lg font-semibold">
          Món án phù hợp với kết quả tìm kiếm:{" "}
          <span className="text-blue-600">{product.total}</span>
        </h4>
        <Row>
          {product?.data.map((el, index) => (
            <Col xs={24} md={12} key={index} className="flex items-center">
              <div>
                <img
                  className="w-full"
                  style={{ maxWidth: "200px" }}
                  src={el?.imageUrls?.split(";")[0]}
                  alt=""
                />
              </div>
              <div>
                <Link
                  to={`/employee/menu?id=${el.id}`}
                  className="text-black font-semibold text-xl hover:text-main"
                >
                  {el.name_product}
                </Link>
                {/* <p className="text-gray-500  my-1">Loại: {el.categoryName}</p> */}
                <p className="text-gray-500 my-1">
                  {truncateString(el.description, 60)}
                </p>
                <div className="flex gap-x-5">
                  <p className="text-main text-lg">{formatGia(el.price)}</p>
                  <ButtonComponents
                    onClick={() => dispatch(AddCart(el))}
                    content="Thêm vào giỏ hàng"
                    className="text-main border-solid border border-secondaryColor"
                  ></ButtonComponents>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-right">
          <Pagination
            responsive={true}
            defaultCurrent={1}
            total={product.total}
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  };
  const renderMaterial = () => {
    if (material.total === 0) return <h4>Không có nguyên liệu phù hợp</h4>;
    return (
      <div>
        <div className="my-3">
          <h4 className="text-lg font-semibold">
            Nguyên liệu phù hợp với kết quả tìm kiếm:{" "}
            <span className="text-blue-600">{material.total}</span>
          </h4>
          {material?.data.map((el, index) => (
            <div key={index} className="flex items-center">
              <div>
                <img
                  className="w-full"
                  style={{ maxWidth: "180px" }}
                  src={el.image}
                  alt=""
                />
              </div>
              <div>
                <Link
                  // to={`/employee/product?id=${el.id}`}
                  className="text-black font-semibold text-xl hover:text-main"
                >
                  {el.name_material}
                </Link>
                <p className="text-gray-500  my-1">
                  Số lượng: {el.amount}
                  {el.unit}
                </p>
                <p className="text-main text-lg">{formatGia(el.price)}</p>
              </div>
            </div>
          ))}
          <div className="text-right">
            <Pagination
              responsive={true}
              defaultCurrent={1}
              total={material.total}
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
      {renderProduct()}
      {renderMaterial()}
    </div>
  );
}

export default SearchPage;
