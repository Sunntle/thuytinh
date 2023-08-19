import { Col, Dropdown, Row } from "antd";
import SearchComponent from "../../components/search";
import ButtonComponents from "../../components/button";
import { useState } from "react";
import { Table } from "antd";

const onMenuClick = (e, record) => {
  console.log("click", e, record);
};

const items = [
  {
    key: "1",
    label: "Edit",
  },
  {
    key: "2",
    label: "Delete",
  },
];
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
      <Dropdown
        menu={{
          items,
          onClick: (e) => onMenuClick(e, record),
        }}
        trigger={["click"]}
      >
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          className="text-3xl"
        >
          ...
        </a>
      </Dropdown>
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
  //   const [confirmLoading, setConfirmLoading] = useState(false);
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
    </div>
  );
}

export default ProductPage;
