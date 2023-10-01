import React from "react";
import { Button, Collapse, Modal, theme } from "antd";
import product from "../../assets/images/product.png";
import { FiChevronDown } from "react-icons/fi";
import { formatCurrency } from "../../utils/format.js";

const ProductDetail = ({
  isProductDetailModalOpen,
  handleOk,
  handleCancel,
  item,
}) => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 6,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: <span className="font-semibold">Mô tả</span>,
      children: <p>{item.description}</p>,
      style: panelStyle,
    },
    {
      key: "2",
      label: <span className="font-semibold">Thành phần chính</span>,
      children: <p>none</p>,
      style: panelStyle,
    },
  ];

  return (
    <Modal
      className="lg:h-full"
      open={isProductDetailModalOpen}
      height={600}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={[
        <Button
          className="bg-primary text-white active:text-white focus:text-white hover:text-white font-medium"
          size="middle"
          onClick={handleOk}
        >
          Ok
        </Button>,
      ]}
    >
      <div className="max-h-96 overflow-y-auto custom-scrollbar mt-8 text-slate-500">
        <div className="w-full h-52 rounded block">
          <img
            className="w-full h-full aspect-square object-cover rounded"
            src={item.imageUrls || item.ImageProducts?.[0]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col mt-3 space-y-3">
          <span className="text-lg text-primary font-bold">
            {item.name_product}
          </span>
          <span className="text-base font-medium">
            Giá: {formatCurrency(item.price)}
          </span>
          <Collapse
            bordered={false}
            size={"small"}
            expandIcon={({ isActive }) => (
              <FiChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isActive ? "rotate-0" : "-rotate-90"
                }`}
              />
            )}
            style={{ background: token.colorBgContainer }}
            items={getItems(panelStyle)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetail;
