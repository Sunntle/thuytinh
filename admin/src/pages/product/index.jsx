import { Col, Row, message } from "antd";
import SearchComponent from "../../components/search";
import ButtonComponents from "../../components/button";
import { useEffect, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import { addNewProduct, getAllCate, getAllMaterial } from "../../services/api";
import AddNewProduct from "./add";

const columns = [
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
    dataIndex: "id_category",
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
const data = [
  {
    key: 1,
    id: 1,
    name_product: "Cá chiên",
    id_category: 1,
    price: 200000,
    status: 0,
  },
  {
    key: 2,
    id: 2,
    name_product: "Cá xào",
    id_category: 2,
    price: 300000,
    status: 1,
  },
  {
    key: 3,
    id: 3,
    name_product: "Rau muống",
    id_category: 0,
    price: 100000,
    status: 0,
  },
  {
    key: 4,
    id: 4,
    name_product: "Cá hấp",
    id_category: 1,
    price: 350000,
    status: 1,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
function ProductPage() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resCate = await getAllCate();
      const resMate = await getAllMaterial();
      setCategories(resCate);
      setMaterials(resMate);
    };
    fetchData();
  }, []);
  const handleDataForm = async (value) => {
    setConfirmLoading(true);
    try {
      const res = await addNewProduct(value);
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
      <Row justify="space-between" align="center" className="mb-4">
        <Col xs={6}>
          <SearchComponent background={"bg-transparent"} size="medium"></SearchComponent>
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
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <AddNewProduct
        open={open}
        confirmLoading={confirmLoading}
        cate={categories}
        material={materials.data}
        handleCancel={handleCancel}
        handleFinish={handleDataForm}
      />
    </div>
  );
}

export default ProductPage;
