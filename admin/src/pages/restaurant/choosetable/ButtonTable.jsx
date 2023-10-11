import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AddTable } from '../../../redux/table/tableSystem';
import { getAllTable } from '../../../services/api';
import { Modal } from 'antd';
import ResPayment from '../payment/res-payment';

export const ButtonTable = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const tables = useSelector((state) => state.table);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resTable = await getAllTable();
      setTableData(resTable);
    };
    fetchData();
  }, []);

  const handleTableClick = (index) => {
    const updatedData = [...tableData];
    updatedData[index].status_table = 1;
    setTableData(updatedData);
    setSelectedTable(updatedData[index]);
    dispatch(AddTable(updatedData[index]));
  };

  const handlePaymentClick = (index) => {
    const updatedData = [...tableData];
    updatedData[index].status_table = 0;
    setTableData(updatedData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(tableData)
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {tableData.map((table, index) => (
        <div key={index}>
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
                onClick={() => handleTableClick(index)}
              >
                Sử dụng
              </button>
            )}
            {table.status_table === 1 && (
              <div>
                <span className="mt-2 text-white  grid justify-items-center">
                  Đang sử dụng
                </span>
                <div className=" mt-3">
                  <button className="mt-2 col-span-2 h-10 w-20 text-white block bg-green-500 rounded" onClick={showModal}>
                    Chi tiết
                  </button>
                  <Modal
                    footer={null}
                    title={`Chi tiết bàn ${selectedTable?.id}`}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <ResPayment />
                  </Modal>
                </div>
              </div>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
