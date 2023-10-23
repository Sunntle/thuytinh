import { Col, Row, Typography, message } from "antd";
import ButtonComponents from "../../components/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import ConfirmComponent from "../../components/confirm";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  editRecipeByIdProduct,
  getAllCate,
  getAllMaterial,
  getAllProduct,
  getOneProduct,
} from "../../services/api";
import AddNewProduct from "./add";
import EditProduct from "./edit";
import { socket } from "../../socket";
import Spinner from "../../components/spinner";
const { Title } = Typography;
function ProductPage() {
  const [open, setOpen] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const resCate = await getAllCate();
      const resMate = await getAllMaterial();
      const resProduct = await getAllProduct();
      console.log("done");
      setProducts({
        ...resProduct,
        data: resProduct.data.map((el) => ({ ...el, key: el.id })) || [],
      });
      setCategories(resCate);
      setMaterials(resMate);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    socket.on("new message", (data) => {
      data?.name == "order" && fetchData();
    });
    return () => {
      socket.off("new message");
    };
  }, [fetchData]);

  const handleDeleteProduct = useCallback(
    async (id_product) => {
      const res = await deleteProduct(id_product);
      if (res) {
        message.open({ type: "success", content: res });
        fetchData();
      } else {
        message.open({ type: "danger", content: "Có gì đó sai sai!" });
      }
    },
    [fetchData]
  );

  const handleClickEditProduct = useCallback(async (id) => {
    const res = await getOneProduct(id);
    setData(res);
    setOpenModelEdit(true);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "Hình ảnh",
        dataIndex: "ImageProducts",
        render: (_, record) => (
          <img
            className="w-full"
            style={{ maxWidth: "150px" }}
            src={record?.ImageProducts?.[0]?.url}
            alt=""
          />
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
        // width: "20%",
      },
      {
        title: "Loại",
        dataIndex: "Category.name_category",
        filters: categories?.map((el) => {
          return {
            text: el.name_category,
            value: el.name_category,
          };
        }),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) =>
          record.Category?.name_category.startsWith(value),
        render: (_, record) => <p>{record.Category?.name_category}</p>,
      },
      {
        title: "Giá",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: "Đã bán",
        dataIndex: "sold",
        sorter: (a, b) => a.sold - b.sold,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        sorter: (a, b) => a.status - b.status,
        render: (_, record) =>
          record.status == 0 ? (
            <ButtonComponents
              content={"Còn hàng"}
              spacingContent={"px-4 py-2"}
              className={"h-9 border-none text-green-500 bg-green-200"}
            />
          ) : (
            <ButtonComponents
              content={"Hết hàng"}
              spacingContent={"px-4 py-2"}
              className={"h-9 border-none text-red-500 bg-red-200"}
            />
          ),
      },
      {
        title: "Action",
        key: "action",
        // fixed: "right",
        // width: "12%",
        render: (_, record) => (
          <div className="h-10 flex items-center cursor-pointer">
            <span
              className="bg-orange-500 px-4 rounded-md py-2 text-white"
              onClick={() => handleClickEditProduct(record.id)}
            >
              Sửa
            </span>
            <ConfirmComponent
              title="Xác nhận xóa món ăn này?"
              confirm={() => handleDeleteProduct(record.id)}
            >
              Xóa
            </ConfirmComponent>
          </div>
        ),
      },
    ],
    [categories, handleClickEditProduct, handleDeleteProduct]
  );

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleDataForm = useCallback(
    async (value) => {
      message.open({
        type: "loading",
        content: "Đang xử lí...",
        duration: 0,
      });
      try {
        let res;
        const formData = new FormData();
        for (const item of Object.entries(value)) {
          if (item[0] == "Image" && item[1]) {
            item[1].forEach((file) => {
              formData.append("Image", file.originFileObj);
            });
          } else if (item[0] == "recipe" && item[1]) {
            formData.append(item[0], JSON.stringify(item[1]));
          } else {
            formData.append(item[0], item[1]);
          }
        }
        res = await addNewProduct(formData);
        message.destroy();
        if (res) {
          message.open({
            type: "success",
            content: "Thêm món ăn mới thành công!",
          });
          fetchData();
        }
      } catch (err) {
        message.open({ type: "error", content: "Có gì đó không ổn!" });
      }
    },
    [fetchData]
  );
  const handleEditForm = useCallback(
    async (value) => {
      message.open({
        type: "loading",
        content: "Đang xử lí...",
        duration: 0,
      });
      try {
        let response;
        const { formName, ...rest } = value;
        if (formName == "product") {
          response = await editProduct(rest);
        } else if (formName == "recipe") {
          response = await editRecipeByIdProduct(rest);
        }
        message.destroy();
        if (response) {
          message.open({
            type: "success",
            content: response,
          });
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [fetchData]
  );
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);
  const handleCancelEdit = useCallback(() => {
    setOpenModelEdit(false);
    setData(null);
  }, []);
  return (
    <div className="my-7 px-5">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Row justify="space-between" align="center" className="mb-4">
            <Col xs={6}>
              <Title level={3}>Danh sách món ăn</Title>
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
            dataSource={products?.data}
            onChange={onChange}
          />
          <AddNewProduct
            open={open}
            cate={categories}
            material={materials?.data}
            handleCancel={handleCancel}
            handleFinish={handleDataForm}
          />
          <EditProduct
            open={openModelEdit}
            cate={categories}
            material={materials?.data}
            handleCancel={handleCancelEdit}
            handleFinish={handleEditForm}
            data={data}
          />
        </>
      )}
    </div>
  );
}

export default ProductPage;
