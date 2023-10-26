import { Col, Row, Typography, message, Form, Input, InputNumber, Drawer, Avatar, notification } from "antd";
import ButtonComponents from "../../components/button";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  importMaterial,
} from "../../services/api";
import EditMaterial from "./edit";
import ColumnChart from "../../components/chart/column-chart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/spinner";
import { formatNgay } from "../../utils/format";
const { Title, Text } = Typography;
function MaterialPage() {
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [data, setData] = useState(null);
  const [dataChart, setDataChart] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const notifications = useSelector(state => state.notifications);

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm()
  const fetchData = useCallback(async () => {
    const res = await getAllMaterial();
    setMaterials({
      ...res,
      data: res.data.map((el) => ({ ...el, key: el.id, price: el.Warehouses?.[0]?.price_import || 0 })),
    });

    setDataChart(res.dataChart);
    setLoading(false)
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (notifications.lastNotification && notifications.lastNotification?.type == location.pathname.split("/").at(-1)) {
      fetchData()
      console.log("fetched");
    }
  }, [notifications, location, fetchData])

  const handleDeleteMaterial = useCallback(async (id_material) => {
    const res = await deleteMaterial(id_material);
    if (res) {
      fetchData();
      message.open({ type: "success", content: res });
    } else {
      message.open({ type: "danger", content: "Có gì đó sai sai!" });
    }
  }, [fetchData]);

  const handleClickEditMaterial = useCallback(async (id) => {
    const res = await getOneMaterial(id);
    setData(res);
    setOpenModelEdit(true);
  }, []);

  const columns = useMemo(() => [
    {
      title: "Nhập hàng",
      dataIndex: "ma",
      fixed: "left",
      render: (_, record) => (
        <span className="cursor-pointer" onClick={() => handleImport(record)}>Nhập hàng</span>
      )
    },
    {
      title: "Hình nguyên liệu",
      dataIndex: "image",

      render: (_, record) => (
        <img
          className="w-full"
          style={{ maxWidth: "120px" }}
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
  ], [handleClickEditMaterial, handleDeleteMaterial]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleDataForm = useCallback(async (value) => {
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
  }, [fetchData]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setData(null);
  }, []);

  const closeDrawer = () => {
    form.resetFields();
    setOpenDrawer(!openDrawer);
  }
  const handleImport = async (record) => {
    setOpenDrawer(true);
    const { name_material, id, image } = record;
    form.setFieldsValue({ name_material, materialId: id, image });
  }
  const handleFinish = async (values) => {
    const res = await importMaterial(values);
    notification.success({ message: "Thông báo", description: res });
    fetchData()
    closeDrawer()
  }
  return (
    <div className="my-7 px-5">
      {contextHolder}
      {loading ? (
        <Spinner />
      ) : (<> {dataChart.length > 0 && (
        <Row justify="space-between">
          <Col xs={24} lg={6} className="flex flex-col mt-4">
            <p className="text-gray-500 mb-3">
              {formatNgay(new Date(), "HH:mm DD-MM-YYYY")}
            </p>
            <Title level={4}>
              Có <span className="text-red-600">{dataChart.length}</span> nguyên liệu gần hết hàng
            </Title>
            <Text className="text-lg ">
              Gồm :{" "}
              {dataChart
                .map((item) => item.name_material.toUpperCase())
                .join(" ,")}
            </Text>
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
        <Drawer title="Nhập nguyên liệu" placement="left" onClose={closeDrawer} open={openDrawer}>
          <Form form={form} onFinish={handleFinish} initialValues={{ price: 0 }}
            labelAlign="left"
            labelCol={{
              span: 24
            }}
            wrapperCol={{
              span: 24
            }}>
            {openDrawer && <img className="p-2" src={form.getFieldValue("image")} />}
            <Form.Item name="name_material" >
              <Input disabled />
            </Form.Item>
            <Form.Item
              hidden name="materialId"
            >
              <Input />
            </Form.Item>
            <Form.Item label="Giá (vnđ) :" name="price" rules={[
              {
                required: true,
                message: "Bạn phải điền tên nguyên liệu",
              },
              {
                type: "number",
                min: 1001,
                message: "Giá phải lớn hơn 1000",
              },
            ]}>
              <InputNumber min={0} className="w-full" formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')} />
            </Form.Item>
            <Form.Item
              name="amount_import"
              label="Số lượng nguyên liệu"
              rules={[
                {
                  required: true,
                  min: 1,
                  message: "Bạn phải nhập số lượng nguyên liệu",
                },
              ]}

            >
              <Input />
            </Form.Item>
            <ButtonComponents
              content={"Nhập nguyên liệu"}
              key="submit"
              htmlType="submit"
              className="border-borderSecondaryColor bg-secondaryColor"
            />


          </Form>
        </Drawer>
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

      </>)}
    </div>
  );
}

export default MaterialPage;
