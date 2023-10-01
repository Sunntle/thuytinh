import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMaterial, getAllProduct } from "../../services/api";
import Spinner from "../../components/spinner";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const kw = searchParams.get("keyword");
    const fetchData = async () => {
      const res = await getAllProduct({ q: kw });
      const resMaterial = await getAllMaterial({ q: kw });
      setMaterial(resMaterial);
      setProduct(res);
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);
  const renderProduct = () => {
    if (product.total === 0) return <h4>Không có sản phẩm phù hợp</h4>;
    return (
      <div>
        <h4>Món án phù hợp với kết quả tìm kiếm: {product.total}</h4>
        {product?.data.map((el, index) => (
          <p key={index}>{el.name_product}</p>
        ))}
      </div>
    );
  };
  const renderMaterial = () => {
    if (material.total === 0) return <h4>Không có nguyên liệu phù hợp</h4>;
    return (
      <div>
        <h4>Nguyên liệu phù hợp với kết quả tìm kiếm: {material.total}</h4>
        {material?.data.map((el, index) => (
          <p key={index}>{el.name_material}</p>
        ))}
      </div>
    );
  };
  return loading ? (
    <Spinner />
  ) : (
    <div>
      {renderProduct()}
      {renderMaterial()}
      Search Params
    </div>
  );
}

export default SearchPage;
