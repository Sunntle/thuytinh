import { useState, useEffect } from "react";
import {
  Table,
  message,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Divider,
  Row,
  Col,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  callDelRecipe,
  callFetchRecipe,
  callUpdateRecipe,
  getAllMaterial,
  getAllProduct,
} from "../../services/api";
import ConfirmComponent from "../../components/confirm";
import ButtonComponents from "../../components/button";
import CreateRecipe from "./add_recipe";
import Spinner from "../../components/spinner";
const init = { show: false, data: [] };
const { Title } = Typography;
const RecipePage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(init);
  const [optionsMaterial, setOptionsMaterial] = useState([]);
  const [optionsProduct, setOptionsProduct] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const [data, productResponse, materialResponse] = await Promise.all([
      callFetchRecipe(),
      getAllProduct(),
      getAllMaterial({
        _sort: "updatedAt",
        _order: "DESC",
      })
    ]);
    const con = materialResponse.data.map((item) => ({
      value: item.id,
      label: `${item.name_material}  (${item.unit})`
    }));
    const conProduct = productResponse.data
      .filter((item) => {
        return !data?.some((pro) => pro.product.id === item.id);
      })
      .map((item) => ({
        value: item.id,
        label: item.name_product,
      }));
    setData(data);
    setOptionsMaterial(con);
    setOptionsProduct(conProduct);
    setLoading(false)
  };

  const handDeleteOrder = async (id) => {
    const res = await callDelRecipe(id);
    message.success(res);
    fetchData();
  };
  const handleCancel = () => {
    setOpenModal(false);
    setOpenModalUpdate(init);
  };
  const showModalUpdate = (record) => {
    console.log(record.materials)
    let materials = record.materials.map((item) => ({
      id_material: item.id,
      id: item.id_recipe,
      quantity: item.quantity,
      id_product: record.product.id,
      descriptionRecipe: item.descriptionRecipe,
    }));
    form.setFieldsValue({ materials: materials });
    setOpenModalUpdate({ show: true, data: materials });
  };
  const onFinish = async (values) => {
    function findArrayChanges(prevArray, newArray) {
      const addedItems = [];
      const updatedItems = [];
      const removedItems = [];
      newArray.forEach((newItem) => {
        const matchingItem = prevArray.find(
          (prevItem) => prevItem.id === newItem.id
        );
        if (!matchingItem) {
          addedItems.push({
            ...newItem,
            id_product: prevArray[0]["id_product"],
          });
        } else if (JSON.stringify(newItem) !== JSON.stringify(matchingItem)) {
          updatedItems.push(newItem);
        }
      });
      prevArray.forEach((prevItem) => {
        const matchingItem = newArray.find(
          (newItem) => newItem.id === prevItem.id
        );
        if (!matchingItem) {
          removedItems.push(prevItem.id);
        }
      });
      return { addedItems, updatedItems, removedItems };
    }
    const result = findArrayChanges(openModalUpdate.data, values.materials);
    const res = await callUpdateRecipe(result);
    message.success(res);
    fetchData();
    handleCancel();
  };
  const changeSelect = (add, value) => {
    const newMaterials = optionsMaterial.filter(
      (item) => !value.materials.find((ma) => ma.id_material === item.value)
    );
    setOptionsMaterial(newMaterials);
    add();
  };

  return (
    <div className="my-7 px-5">
      {loading ? (
        <Spinner />
      ) : (<>
        <Row justify="space-between" align="center" className="mb-4">
          <Col xs={6}>
            <Title level={3}>Công thức sản phẩm</Title>
          </Col>
          <Col xs={6} style={{ textAlign: "-webkit-right" }}>
            <ButtonComponents
              className="border-borderSecondaryColor text-main"
              onClick={() => setOpenModal(true)}
              content={"Thêm mới"}
            />
          </Col>
        </Row>
        <Table
          className="mt-3"
          columns={[
            {
              title: "Tên sản phẩm",
              key: "name_product",
              render: (_, record) => <span> {record.product.name_product}</span>,
            },
            {
              title: "Ảnh sản phẩm",
              key: "thumbnail",
              render: (_, record) => (
                <img src={record.product.ImageProducts?.[0]?.url} width={100} />
              ),
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Nguyên liệu",
              key: "materials",
              width: "30%",
              render: (_, record) =>
                record.materials.map((item) => (
                  <div key={Math.random()} className="flex gap-2">
                    <div className=" font-medium text-base">
                      {item.name_material}
                    </div>
                    <div className=" text-gray-500 text-base">
                      {item.quantity}/{item.unit}
                    </div>
                  </div>
                )),
            },

            {
              title: "Chỉnh sửa",
              key: "action",
              render: (_, record) => (
                <div className="h-10 flex items-center cursor-pointer">
                  <span
                    className="bg-orange-500 px-4 rounded-md py-2 text-white"
                    onClick={() => showModalUpdate(record)}
                  >
                    Sửa
                  </span>
                  <ConfirmComponent
                    title="Xác nhận xóa đơn hàng"
                    confirm={() => handDeleteOrder(record.product.id)}
                  >
                    Xóa
                  </ConfirmComponent>
                </div>
              ),
            },
          ]}
          dataSource={data}
          rowKey={(data) => data.product.id}
        />
        <Modal
          footer={null}
          centered
          open={openModalUpdate.show}
          width={500}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="update"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="text-xl text-center mt-2">Công thức</div>
            <Divider />
            <div className="h-96 overflow-y-auto">
              <Form.List name="materials">
                {(fields, { add, remove }) => (
                  <div>
                    {fields.map(({ key, name, ...restField }) => (
                      <div className="flex flex-col items-center" key={key}>
                        <Form.Item
                          {...restField}
                          name={[name, "id_product"]}
                          hidden
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          className="w-full"
                          label="Nguyên liệu"
                          {...restField}
                          name={[name, "id_material"]}
                          rules={[
                            {
                              required: true,
                              message: "Chọn Nguyên liệu",
                            },
                          ]}
                        >
                          <Select options={optionsMaterial} />
                        </Form.Item>
                        <Form.Item
                          label="Số lượng"
                          className="w-full"
                          {...restField}
                          name={[name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Nhập số lượng",
                            },
                          ]}
                        >
                          <Input placeholder="Số lượng" />
                        </Form.Item>
                        <Form.Item
                          className="w-full"
                          name={[name, "descriptionRecipe"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng mô tả",
                            },
                          ]}
                        >
                          <Input
                            rows={4}
                            placeholder="Mô tả công thức của sản phẩm"
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        className="mt-8"
                        type="dashed"
                        onClick={() => changeSelect(add, form.getFieldsValue())}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </div>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <CreateRecipe
          openModal={openModal}
          handleCancel={handleCancel}
          fetchData={fetchData}
          optionsMaterial={optionsMaterial}
          optionsProduct={optionsProduct}
          changeSelect={changeSelect}
        /></>)}
    </div>
  );
};

export default RecipePage;
