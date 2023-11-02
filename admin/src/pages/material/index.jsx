import { Col, Row, Typography, message, Form, Input, InputNumber, Drawer, notification, Button, Tooltip } from "antd";
import ButtonComponents from "../../components/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import AddNewMaterial from "./add";
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
import { formatGia, formatNgay } from "../../utils/format";
import { socket } from "../../socket";
import { overMasterial, unitMasterial } from "../../utils/constant";
const { Title, Text } = Typography;
const renderToString = (data) => {
  return `
    <div class="flex p-2 flex-col gap-2">
      <img src="${data.image}" class="w-20 mx-auto"/>
      <div>Tên: ${data.x}</div>
      <div>Số lượng: ${data.y}/(${data.unit})</div>
      ${data.detail ? `<div> Chuyển đổi: ${data.detail}</div>` : ''}
    </div>
  `;
};
function MaterialPage() {
  const [open, setOpen] = useState(false);
  const [, contextHolder] = notification.useNotification();
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [data, setData] = useState(null);
  const [dataChart, setDataChart] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const notifications = useSelector(state => state.notifications);
  const [listImportMaterial, setListImportMaterial] = useState([])
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const fetchData = useCallback(async () => {
    const res = await getAllMaterial();
    setMaterials({
      ...res,
      data: res.data.map((el) => ({ ...el, key: el.id, price: el.Warehouses?.[0]?.price_import || 0 })),
    });
    setListImportMaterial(res.listImport);
    const convert = res.dataChart.map(i => {
      let q = { x: i.name_material, unit: i.unit, image: i.image }
      if (i.unit === "gram") {
        q = { ...q, y: i.amount / 1000, detail: `${i.unit} => kg` }
      } else {
        q = { ...q, y: i.amount }
      }
      return q
    })
    setDataChart(convert);
    setLoading(false)
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    socket.on("new message", arg => {
      if (arg.type === "material") {
        fetchData()
      }
    })
    return () => {
      socket.off("new message")
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

  const handleImport = useCallback(async (record) => {
    setOpenDrawer(true);
    const { name_material, id, image } = record;
    form.setFieldsValue({ name_material, materialId: id, image });
  }, [form])

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
  ], [handleClickEditMaterial, handleDeleteMaterial, handleImport]);

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

  const closeDrawer = useCallback(() => {
    form.resetFields();
    setOpenDrawer(!openDrawer);
  }, [form, openDrawer])

  const handleFinish = useCallback(async (values) => {
    const res = await importMaterial(values);
    notification.success({ message: "Thông báo", description: res });
    fetchData()
    closeDrawer()
  }, [closeDrawer, fetchData])
  const unitMasterialTextOver = () => {
    let result = unitMasterial.map((val, i) => (`${overMasterial[i]} ${val}`)).join(", ")
    return result
  }
  return (
    <div className="my-7 px-5">
      {contextHolder}
      {loading ? (
        <Spinner />
      ) : (<>
        <Row justify="space-between" gutter={[0, 12]}>
          <Col xs={24} lg={8} >
            <Title level={3}>
              Danh sách nguyên liệu nhập gần đây
            </Title>
            <div className="h-[28vh] overflow-y-auto flex flex-col  rounded-sm drop-shadow-sm">
              {listImportMaterial.map((item) => (
                <div key={item.id} className="border_bottom py-2">
                  <Text><span className="text-main">{formatNgay(item.createdAt)}</span>: {item.Material.name_material} - {item.amount_import}{item.Material.unit} với giá : <span className="font-semibold">{formatGia(item.price_import)}/1{item.Material.unit}</span></Text>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} lg={15}>
            <Title level={5} className="text-center">
              Có <span className="text-red-600">{dataChart.length}</span> nguyên liệu gần hết hàng
            </Title>
            <ColumnChart
              series={[
                {
                  name: "Nguyên liệu gần hết",
                  data: dataChart.map((item) => item),
                },
              ]}
              colors="#EF4444"
              // categories={dataChart.map(
              //   (item) => `${item.name_material} (${item.unit})`
              // )}
              columnWidth="20px"
              customOptions={{
                yaxis: {
                  min: 0,
                  max: (max) => {
                    if (max == 0) return 20
                    return max;
                  },
                  tickAmount: 1,
                },
                xaxis: {
                  categories: dataChart.map(
                    (item) => item.x
                  ),
                },

                tooltip: {
                  custom: function ({ _, seriesIndex, dataPointIndex, w }) {
                    let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

                    return renderToString(data)
                  }
                }

              }}
            />
            <div className="text-center font-medium">
              <Text>Dưới {unitMasterialTextOver()} sẽ thông báo</Text>
            </div>
          </Col>
        </Row>


        <Row justify="space-between" align="center" className="mb-4">
          <Col xs={6} className="flex items-center gap-4">
            <Title level={3} className="mb-0">Danh sách nguyên liệu </Title>
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

      </>)
      }
    </div >
  );
}

export default MaterialPage;
