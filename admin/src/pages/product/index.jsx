import { Col, Row, Typography, message, Input, Button, Space, Table } from "antd";
import ButtonComponents from "../../components/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
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
import Spinner from "../../components/spinner";
import { useRef } from "react";
import ImageComponent from "../../components/image";
const { Title } = Typography;
function ProductPage() {
  const [open, setOpen] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const searchInput = useRef(null);
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [resCate, resMate, resProduct] = await Promise.all([getAllCate(), getAllMaterial(), getAllProduct() ])
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
  const handleSearch = (selectedKeys, confirm, ) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const handleSearchData = useCallback((string) =>{
    if(string.includes("_")){
      const arr = string.split("_")
      const newArr = arr.map(el=>el[0].toUpperCase() + el.slice(1))
      return newArr.join(" ")
    }
    return string[0].toUpperCase() + string.slice(1)
  },[])
  const getColumnSearchProps = (dataIndex) => ({
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
  });
  const columns = useMemo(
    () => [
      {
        title: "Hình ảnh",
        dataIndex: "imageproducts",
        render: (_, record) => (
          <ImageComponent src={record?.imageproducts?.[0]?.url} list={record?.imageproducts}/>
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
        ...getColumnSearchProps("name_product")
        // width: "20%",
      },
      {
        title: "Loại",
        dataIndex: ["category","name_category"],
        // ...getColumnSearchProps("category","name_category"),
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
        dataIndex: "amount",
        sorter: (a, b) => a.amount - b.amount,
        render: (_, record) =>
          record.amount > 0 ? (
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
