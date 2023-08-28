import { Col, Row, message } from "antd";
import SearchComponent from "../../components/search";
import ButtonComponents from "../../components/button";
import { useEffect, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import AddNewMaterial from "./add";
import { addNewMaterial, getAllMaterial } from "../../services/api";

const columns = [
  {
    title: "Hình nguyên liệu",
    dataIndex: "image",
    render: (_, record) => <img className="w-full" style={{ maxWidth: "200px" }} src={record.image} alt="" />,
  },
  {
    title: "Mã nguyên liệu",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Tên",
    dataIndex: "name_material",
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
    onFilter: (value, record) => record.name_material.startsWith(value),
    width: "20%",
  },
  {
    title: "Đơn vị",
    dataIndex: "unit",
    filters: [
      {
        text: "Gram",
        value: "gram",
      },
      {
        text: "Kg",
        value: "kg",
      },
      {
        text: "cái",
        value: "cai",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.unit.startsWith(value),
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Số lượng",
    dataIndex: "amount",
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
function MaterialPage() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllMaterial();
      setMaterials({ ...res, data: res.data.map((el) => ({ ...el, key: el.id })) });
    };
    fetchData();
  }, []);
  const handleDataForm = async (value) => {
    setConfirmLoading(true);
    try {
      const res = await addNewMaterial(value);
      if (res) {
        message.open({
          type: "success",
          content: "Thêm nguyên liệu mới thành công!",
        });
        setOpen(false);
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
      <Table bordered columns={columns} dataSource={materials.data} onChange={onChange} />
      <AddNewMaterial
        open={open}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        handleFinish={handleDataForm}
      />
    </div>
  );
}

export default MaterialPage;
