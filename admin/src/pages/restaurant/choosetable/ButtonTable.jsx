import React, { useEffect, useState } from 'react'
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { AddTable } from '../../../redux/table/tableSystem';
import { getAllTable } from '../../../services/api';
import { Modal } from 'antd';
import ResPayment from '../payment/res-payment';

export const ButtonTable = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  // SHOW TABLES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Get DATA
  useEffect(() => {
    const fetchData = async () => {
      const resTable = await getAllTable();
      setTableData(resTable);
    }
    fetchData();
  }, []);
  const handleTableClick = (index) => {
    const updatedData = [...tableData];
    updatedData[index].status_table = 1;
    setTableData(updatedData);

    dispatch(AddTable(updatedData[index]));
  };
  const handlePaymentClick = (index) => {
    const updatedData = [...tableData];
    updatedData[index] = { ...updatedData[index], status_table: 0 };
    setTableData(updatedData);
  };
  // 
  const tables = useSelector(state => state.table)
  console.log(tables)
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {tableData.map((table, index) => (
        <div key={index}>
          <span
            className={`w-full flex flex-col h-[200px] items-center justify-center p-4 rounded-lg shadow-md ${table.status_table
              ? "bg-main text-white border-yellow-400 border-3px border-solid"
              : "bg-[#D1D5DB] text-white"
              } transition-colors hover:bg-secondaryColor hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid`}
          >
            <FiUsers className="w-6 h-6 mb-2" />
            Bàn {table.id}
            <button className={` ${table.status_table ? "hidden" : "bg-main text-white font-semibold h-10 w-20 rounded mt-3"}`} onClick={() => handleTableClick(index)}>Sử dụng</button>
            {table.status_table ? (
              <div>
                <span className="mt-2 text-white block grid justify-items-center">Đang sử dụng</span>
                <div className='grid grid-cols-4 mt-3'>
                  <button className="mt-2 col-span-2 text-white block" onClick={showModal}>chi tiết</button>
                  <Modal footer={null} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <ResPayment />
                  </Modal>
                  <button className="mt-2 col-span-2 h-10 w-20 rounded text-white bg-green-500" onClick={() => handlePaymentClick(index)}>Thanh toan</button>
                </div>
              </div>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

