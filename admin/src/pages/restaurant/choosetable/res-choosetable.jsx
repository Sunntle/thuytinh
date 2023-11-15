import React, { useCallback, useEffect, useState } from 'react';
import { Button, Tabs, notification } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { AddTable } from '../../../redux/table/tableSystem';
import { getAllTable, getTableId } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import ResOrder from '../order/res-order';
import { AddTableList, RemoveTableList } from '../../../redux/table/listTableSystem';
import { socket } from '../../../socket';
const ButtonTable = ({ table, handleTableClick, handleDetailModal }) => (
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
          onClick={() => handleTableClick(table)}
        >
          Sử dụng
        </button>
      )}
      {table.status_table === 1 && (
        <div>
          <span className="mt-2 text-white  grid justify-items-center">
            Đang sử dụng
          </span>
          <div className="mt-3">
            <Button
              className="mt-2 border-none col-span-2 h-10 w-20 text-white block bg-green-500 rounded"
              onClick={() => handleDetailModal(table)}
            >
              Chi tiết
            </Button>
          </div>
        </div>
      )}
    </span>
  </div>
);

const ResChooseTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table);
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const userId = useSelector((state) => state.account.user.id)




  useEffect(() => {
    socket.on("new message", arg => {
      if (arg.type === "order") {
        fetchData()
      }
    })
    socket.on("status table", (arg) => {
      fetchData()
    })
    return () => {
      socket.off("new message")
    }
  }, [])
  const fetchData = useCallback(async () => {
    const resTable = await getAllTable();
    dispatch(AddTable(resTable));
  },[]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableClick = (index) => {
    dispatch(AddTableList(index));
    navigate('/employee/menu/');
  };

  const handleDetailModal = async (table) => {
    const resTableId = await getTableId(table.id, { id_employee: userId })
    const tableByOrders = resTableId[0].tablebyorders;
    if (tableByOrders && tableByOrders.length === 0 || tableByOrders == undefined) {
      api.info({
        message: 'Thông báo!!!',
        description:
          'Người dùng đang đặt hàng!!!',
      });
    }
    else {
      dispatch(AddTableList(resTableId));
      setOpen(true)
    }

  }
  const handleCancel = () => {
    dispatch(RemoveTableList())
    setOpen(false);
  };

  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {tableData && tableData.map((table, index) => (
            <ButtonTable
              key={table.id}
              table={table}
              handleTableClick={handleTableClick}
              handleDetailModal={handleDetailModal}
            />
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Ngoài trời',
      children: (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {tableData && tableData?.map((table, index) => {
            if (table.position === 'out') {
              return (
                <ButtonTable
                  key={table.id}
                  table={table}
                  handleTableClick={handleTableClick}
                  handleDetailModal={handleDetailModal}
                />
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
          {tableData && tableData?.map((table, index) => {
            if (table.position === 'in') {
              return (
                <ButtonTable
                  key={table.id}
                  table={table}
                  handleTableClick={handleTableClick}
                  handleDetailModal={handleDetailModal}
                />
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
        {contextHolder}
        <Tabs className="mx-6 text-slate-500 active:text-main" defaultActiveKey="1" animated items={items} />
        <ResOrder handleCancel={handleCancel} open={open} />
      </div>
    </>
  );
};

export default ResChooseTable;
