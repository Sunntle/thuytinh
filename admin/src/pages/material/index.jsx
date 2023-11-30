import { Col, Row, Typography, message, Form, Input, InputNumber, Drawer, Button, Space } from "antd";
import ButtonComponents from "../../components/button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import Spinner from "../../components/spinner";
import { formatGia, formatNgay } from "../../utils/format";
import { overMasterial, unitMasterial, renderToString } from "../../utils/constant";
import { SearchOutlined } from "@ant-design/icons";
import ImageComponent from "../../components/image";
const { Title, Text } = Typography;
const handleSearchData = (string) =>{
  if(string.includes("_")){
    const arr = string.split("_")
    const newArr = arr.map(el=>el[0].toUpperCase() + el.slice(1))
    return newArr.join(" ")
  }
  return string[0].toUpperCase() + string.slice(1)
}
function MaterialPage() {
  const [open, setOpen] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [data, setData] = useState(null);
  const [dataChart, setDataChart] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const customize = useSelector(state => state.customize)
  const notifications = useSelector(state => state.notifications)
  const [listImportMaterial, setListImportMaterial] = useState([])
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const searchInput = useRef(null);

  const fetchData = useCallback(async () => {
    const res = await getAllMaterial();
    setMaterials({
      ...res,
      data: res.data.map((el) => ({ ...el, key: el.id, price: el.warehouses?.[0]?.price_import || 0 })),
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
    if(notifications.isLoading == false && notifications.lastNotification !== null && notifications.lastNotification?.type === 'material' && notifications.lastNotification?.status === false){
      fetchData()
    }
  }, [fetchData, notifications])

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

  const handleSearch = (selectedKeys, confirm, ) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
 
  const getColumnSearchProps = useCallback((dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${handleSearchData(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={()=> clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            }}
          >
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
    record[dataIndex]
    ?.toString()
    ?.toLowerCase()
    ?.includes(value?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  }),[]);

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
        <ImageComponent src={record.image}/>
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
      ...getColumnSearchProps("name_material")
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
  ], [getColumnSearchProps, handleClickEditMaterial, handleDeleteMaterial, handleImport]);

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
    await importMaterial(values);
    closeDrawer()
  }, [closeDrawer])

  const unitMasterialTextOver = () => {
    let result = unitMasterial.map((val, i) => (`${overMasterial[i]} ${val}`)).join(", ")
    return result
  }
  return (
    <div className="my-7 px-5">
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
                  <Text><span className="text-main">{formatNgay(item.createdAt)}</span>: {item.material.name_material} - {item.amount_import}{item.material.unit} với giá : <span className="font-semibold">{formatGia(item.price_import)}/1{item.material.unit}</span></Text>
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
              columnWidth="20px"
              customOptions={{
                yaxis: {
                  min: 0,
                  max: (max) => {
                    if (max == 0) return 20
                    return max;
                  },
                  tickAmount: 1,
                  labels: {
                    formatter: (val) => {
                      return val
                    }
                  },
                },
                xaxis: {
                  categories: dataChart.map(
                    (item) => item.x
                  ),
                },

                tooltip: {
                  theme: customize.darkMode ? 'dark' : 'light',
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
                  message: "Bạn phải nhập số lượng nguyên liệu",
                },
                {
                  type: "number",
                  min: 1,
                  message: "Số lượng nguyên liệu phải lớn hơn 0",
                },
              ]}

            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <ButtonComponents
              content={"Nhập nguyên liệu"}
              key="submit"
              htmlType="submit"
              className="border-borderSecondaryColor bg-secondaryColor text-white"
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
