import { Col, Row, message } from "antd";
import SearchComponent from "../../components/search";
import ButtonComponents from "../../components/button";
import { useEffect, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import AddNewMaterial from "./add";
import {
  addNewMaterial,
  deleteMaterial,
  editMaterial,
  getAllMaterial,
  getOneMaterial,
} from "../../services/api";
import EditMaterial from "./edit";

function MaterialPage() {
  const [open, setOpen] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await getAllMaterial();
    setMaterials({
      ...res,
      data: res.data.map((el) => ({ ...el, key: el.id })),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteMaterial = async (id_material) => {
    const res = await deleteMaterial(id_material);
    console.log(res);
    if (res) {
      fetchData();
      message.open({ type: "success", content: res });
    } else {
      message.open({ type: "danger", content: "Có gì đó sai sai!" });
    }
  };
  const handleClickEditMaterial = async (id) => {
    const res = await getOneMaterial(id);
    setData(res);
    setOpenModelEdit(true);
  };
  const columns = [
    {
      title: "Hình nguyên liệu",
      dataIndex: "image",
      fixed: "left",
      render: (_, record) => (
        <img
          className="w-full"
          style={{ maxWidth: "200px" }}
          src={record.image}
          alt=""
        />
      ),
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
      title: "Action",
      key: "action",
      width: "12%",
      fixed: "right",
      render: (_, record) => (
        <div className="h-10 flex items-center cursor-pointer">
          <span
            className="bg-orange-500 px-4 rounded-md py-2 text-white"
            onClick={() => handleClickEditMaterial(record.id)}
          >
            Sửa
          </span>
          <ConfirmComponent
            title="Xóa nguyên liệu cũng sẽ ảnh hưởng đến công thức, xác nhận xóa?"
            confirm={() => handleDeleteMaterial(record.id)}
          >
            Xóa
          </ConfirmComponent>
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleDataForm = async (value) => {
    message.open({
      type: "loading",
      content: "Đang xử lí...",
      duration: 0,
    });
    try {
      let res;
      const formData = new FormData();
      const { status, ...dataForm } = value;
      for (const item of Object.entries(dataForm)) {
        if (item[0] == "Image" && item[1]) {
          item[1].forEach((file) => {
            formData.append("Image", file.originFileObj);
          });
        } else {
          formData.append(item[0], item[1]);
        }
      }
      if (status == "add") {
        res = await addNewMaterial(formData);
      } else {
        res = await editMaterial(formData);
      }
      message.destroy();
      if (res) {
        message.open({
          type: "success",
          content:
            status == "edit"
              ? "Sửa nguyên liệu thành công!"
              : "Thêm nguyên liệu mới thành công!",
        });
        status === "edit" ? setOpenModelEdit(false) : setOpen(false);
        fetchData();
      }
    } catch (err) {
      message.open({ type: "error", content: "Có gì đó không ổn!" });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setData(null);
  };
  return (
    <div className="my-7 px-5">
      <Row justify="space-between" align="center" className="mb-4">
        <Col xs={6}>
          <SearchComponent
            background={"bg-transparent"}
            size="medium"
          ></SearchComponent>
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
      <Table
        columns={columns}
        dataSource={materials.data}
        onChange={onChange}
      />
      <AddNewMaterial
        open={open}
        handleCancel={handleCancel}
        handleFinish={handleDataForm}
      />
      <EditMaterial
        open={openModelEdit}
        handleCancel={() => setOpenModelEdit(false)}
        handleFinish={handleDataForm}
        data={data}
      />
    </div>
  );
}

export default MaterialPage;
