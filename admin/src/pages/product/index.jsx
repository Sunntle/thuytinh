import { Col, Row, message } from "antd";
import SearchComponent from "../../components/search";
import ButtonComponents from "../../components/button";
import { useEffect, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import { addNewProduct, getAllCate, getAllMaterial, getAllProduct } from "../../services/api";
import AddNewProduct from "./add";

const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "imageUrls",
    render: (_, record) => (
      <img className="w-full" style={{ maxWidth: "150px" }} src={record?.imageUrls?.split(";")[0]} alt="" />
    ),
  },
  {
    title: "Mã món",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Tên",
    dataIndex: "name_product",
    filters: [
      {
        text: "Cá",
        value: "Cá",
      },
      {
        text: "Rau",
        value: "Rau",
      },
      {
        text: "Thịt",
        value: "Thịt",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name_product.startsWith(value),
    width: "30%",
  },
  {
    title: "Loại",
    dataIndex: "categoryName",
    sorter: (a, b) => a.id_category - b.id_category,
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    sorter: (a, b) => a.status - b.status,
    className: "text-center",
  },
  {
    title: "#",
    key: "action",
    render: (_, record) => (
      <div className="h-10 flex items-center cursor-pointer">
        <span className="bg-orange-500 px-4 rounded-md py-2 text-white">Sửa</span>
        <ConfirmComponent title="Xác nhận xóa đơn hàng" confirm={() => console.log(record.id)}>
          Xóa
        </ConfirmComponent>
      </div>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
function ProductPage() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const resCate = await getAllCate();
      const resMate = await getAllMaterial();
      const resProduct = await getAllProduct();
      setProducts({ ...resProduct, data: resProduct.data.map((el) => ({ ...el, key: el.id })) });
      setCategories(resCate);
      setMaterials(resMate);
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleDataForm = async (value) => {
    setConfirmLoading(true);
    try {
      const formData = new FormData();
      for (const item of Object.entries(value)) {
        if (item[0] == "Image") {
          item[1].forEach((file) => {
            formData.append("Image", file.originFileObj);
          });
        } else {
          formData.append(item[0], item[1]);
        }
      }
      const res = await addNewProduct(formData);
      if (res) {
        setOpen(false);
        message.open({
          type: "success",
          content: "Thêm món ăn mới thành công!",
        });
      }
    } catch (err) {
      message.open({ type: "error", content: "Có gì đó không ổn!" });
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="my-7 px-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row justify="space-between" align="center" className="mb-4">
            <Col xs={6}>
              <SearchComponent background={"bg-transparent"} size="medium" />
            </Col>
            <Col xs={6} style={{ textAlign: "-webkit-right" }}>
              <ButtonComponents
                borderColor={"border-borderSecondaryColor"}
                backgroundColor={"bg-secondaryColor"}
                content={"Thêm mới"}
                onClick={() => setOpen(true)}
              />
            </Col>
          </Row>
          <Table columns={columns} dataSource={products?.data} onChange={onChange} />
          <AddNewProduct
            open={open}
            confirmLoading={confirmLoading}
            cate={categories}
            material={materials?.data}
            handleCancel={handleCancel}
            handleFinish={handleDataForm}
          />
        </>
      )}
    </div>
  );
}

export default ProductPage;
