import { Col, Row, Typography, message } from "antd";
import ButtonComponents from "../../components/button";
import { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import AddNewMaterial from "./add";
const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];
import {
  addNewMaterial,
  deleteMaterial,
  editMaterial,
  getAllMaterial,
  getOneMaterial,
} from "../../services/api";
import EditMaterial from "./edit";
import ColumnChart from "../../components/chart/column-chart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const { Title } = Typography;
function MaterialPage() {
  const [open, setOpen] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [data, setData] = useState(null);
  const [dataChart, setDataChart] = useState([]);
  const notifications = useSelector(state => state.notifications)
  const location = useLocation();
  const fetchData = useCallback(async () => {
    const res = await getAllMaterial();
    setMaterials({
      ...res,
      data: res.data.map((el) => ({ ...el, key: el.id })),
    });

    setDataChart(res.dataChart);
  },[]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(()=>{
    if(notifications.lastNotification && notifications.lastNotification?.type == location.pathname.split("/").at(-1)){
      fetchData()
      console.log("fetched");
    }
  },[notifications,location,fetchData])
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
      {dataChart.length > 0 && (
        <Row justify={"space-between"}>
          <Col xs={24} lg={6}>
            <h3 className="text-lg text-black font-medium">
              Thông báo sắp{" "}
              <b className="text-xl text-[#EF4444]"> {dataChart.length} </b>{" "}
              nguyên liệu gần hết hàng
            </h3>
            <h4 className="text-base font-normal text-zinc-700 ">
              Gồm :{" "}
              {dataChart
                .map((item) => item.name_material.toUpperCase())
                .join(" ,")}
            </h4>
          </Col>
          <Col xs={24} lg={18}>
            <ColumnChart
              series={[
                {
                  name: "Nguyên liệu gần hết",
                  data: dataChart.map((item) => item.amount),
                },
              ]}
              colors="#EF4444"
              categories={dataChart.map(
                (item) => `${item.name_material} (${item.unit})`
              )}
            />
          </Col>
        </Row>
      )}

      <Row justify="space-between" align="center" className="mb-4">
        <Col xs={6}>
          <Title level={4}>Danh sách nguyên liệu</Title>
        </Col>
        <Col xs={6} style={{ textAlign: "-webkit-right" }}>
          <ButtonComponents
            className="border-borderSecondaryColor text-main"
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
        unitMasterial={unitMasterial}
      />
      <EditMaterial
        open={openModelEdit}
        handleCancel={() => setOpenModelEdit(false)}
        handleFinish={handleDataForm}
        data={data}
        unitMasterial={unitMasterial}
      />
    </div>
  );
}

export default MaterialPage;
