import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { AddTable, RemoveTable } from '../../../redux/table/tableSystem';
import { getAllTable, getTableId } from '../../../services/api';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import ResOrder from '../order/res-order';
import { AddTableList } from '../../../redux/table/listTableSystem';

const ResChooseTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table);
  const tableListData = useSelector((state) => state.tablelist);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resTable = await getAllTable();
      dispatch(AddTable(resTable));
      console.log(resTable)
      console.log(1)
    };
    fetchData();
  }, [dispatch]);

  const handleTableClick = (index) => {
    // const updatedData = [...tableData];
    // updatedData[index].status_table = 1;
    // dispatch(AddTable(updatedData[index]));
    navigate('/employee/menu');
  };

  const handleDetailTable = (index) => {
    // console.log(index.order.orderToDetail)
    // getTableId(`/${tableData[index].id}?id_order=${tableListData.orderId}`);
    // dispatch(AddTable(tableData[index]));
    dispatch(AddTableList(index));
    showModal();
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Array.isArray(tableData) && tableData.map((table, index) => (
            <div key={table.id}>
              <span
                className={`w-full flex flex-col h-[200px] items-center justify-center p-4 rounded-lg shadow-md ${table.status_table
                  ? 'bg-main text-white border-yellow-400 border-3px border-solid'
                  : 'bg-[#D1D5DB] text-white'
                  } transition-colors hover:bg-secondaryColor hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid`}
              >
                <FiUsers className="w-6 h-6 mb-2" />
                Bàn {table.id}
                {table.status_table === 0 && (
                  <button
                    className="bg-main text-white font-semibold h-10 w-20 rounded mt-3"
                    onClick={() => handleTableClick(table.id)}
                  >
                    Sử dụng
                  </button>
                )}
                {table.status_table === 1 && (
                  <div>
                    <span className="mt-2 text-white block grid justify-items-center">
                      Đang sử dụng
                    </span>
                    <div className="mt-3">
                      <button
                        className="mt-2 col-span-2 h-10 w-20 text-white block bg-green-500 rounded"
                        onClick={() => handleDetailTable(table)}
                      >
                        Chi tiết
                      </button>
                      <Modal
                        footer={null}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <ResOrder />
                      </Modal>
                    </div>
                  </div>
                )}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Ngoài trời',
      children: (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Array.isArray(tableData) && tableData?.map((table, index) => {
            if (table.position === 'out') {
              return (
                <div key={table.id}>
                  <span
                    className={`w-full flex flex-col h-[200px] items-center justify-center p-4 rounded-lg shadow-md ${table.status_table
                      ? 'bg-main text-white border-yellow-400 border-3px border-solid'
                      : 'bg-[#D1D5DB] text-white'
                      } transition-colors hover:bg-secondaryColor hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid`}
                  >
                    <FiUsers className="w-6 h-6 mb-2" />
                    Bàn {table.id}
                    {table.status_table === 0 && (
                      <button
                        className="bg-main text-white font-semibold h-10 w-20 rounded mt-3"
                        onClick={() => handleDetailTable(table.id)}
                      >
                        Sử dụng
                      </button>
                    )}
                    {table.status_table === 1 && (
                      <div>
                        <span className="mt-2 text-white block grid justify-items-center">
                          Đang sử dụng
                        </span>
                        <div className="mt-3">
                          <button
                            className="mt-2 col-span-2 h-10 w-20 text-white block bg-green-500 rounded"
                            onClick={() => handleDetailTable(table)}
                          >
                            Chi tiết
                          </button>
                          <Modal
                            footer={null}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <ResOrder />
                          </Modal>
                        </div>
                      </div>
                    )}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      ),
    },
    {
      key: '3',
      label: 'Trong nhà',
      children: (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Array.isArray(tableData) && tableData?.map((table, index) => {
            if (table.position === 'in') {
              return (
                <div key={table.id}>
                  <span
                    className={`w-full flex flex-col h-[200px] items-center justify-center p-4 rounded-lg shadow-md ${table.status_table
                      ? 'bg-main text-white border-yellow-400 border-3px border-solid'
                      : 'bg-[#D1D5DB] text-white'
                      } transition-colors hover:bg-secondaryColor hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid`}
                  >
                    <FiUsers className="w-6 h-6 mb-2" />
                    Bàn {table.id}
                    {table.status_table === 0 && (
                      <button
                        className="bg-main text-white font-semibold h-10 w-20 rounded mt-3"
                        onClick={() => handleTableClick(table.id)}
                      >
                        Sử dụng
                      </button>
                    )}
                    {table.status_table === 1 && (
                      <div>
                        <span className="mt-2 text-white block grid justify-items-center">
                          Đang sử dụng
                        </span>
                        <div className="mt-3">
                          <button
                            className="mt-2 col-span-2 h-10 w-20 text-white block bg-green-500 rounded"
                            onClick={() => handleDetailTable(index)}
                          >
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="w-full p-10">
        <Tabs className="mx-6 text-slate-500 active:text-main" defaultActiveKey="1" items={items} />
      </div>
    </>
  );
};

export default ResChooseTable;
