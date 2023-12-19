import React, { useEffect, useState } from 'react';
import { Button, Tabs, notification } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { AddTable } from '../../../redux/table/tableSystem';
import { getAllTable, switchTables } from '../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import ResOrder from '../order/res-order';
import { AddTableList, RemoveTableList } from '../../../redux/table/listTableSystem';
import { socket } from '../../../socket';
const ButtonTable = ({ table, switchTable, handleDetailModal }) => (
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
        <Button
          className="bg-main border-none text-white font-semibold h-10 w-30 rounded mt-3"
          onClick={() => switchTable(table.id)}
        >
          Chuyển bàn
        </Button>
      )}
      {table.status_table === 1 && (
        <div>
          <span className="mt-2 text-white  grid justify-items-center">
            Đang sử dụng
          </span>

        </div>
      )}
    </span>
  </div>
);

const ResSelectTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table);
  const [open, setOpen] = useState(false);
  const { id, idOrder } = useParams();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const resTable = await getAllTable();
      dispatch(AddTable(resTable));
    };
    fetchData();
  }, [dispatch]);
  const switchTable = async (newTable) => {
    const res = { currentTable: +id, newTable: newTable, idOrder: +idOrder };
    const { success, data } = await switchTables(res);
    if (success) {
      api.success({
        message: 'Thông báo',
        description: data
      });
      dispatch(RemoveTableList())
      navigate('/employee/choosetable/');
    } else {
      api.info({
        message: 'Thông báo',
        description: data
      });
    }
  };

  const handleDetailModal = (index) => {
    dispatch(AddTableList(index));
    setOpen(true)
  }
  const handleCancel = () => {
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
              switchTable={switchTable}
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
                  switchTable={switchTable}
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
                  switchTable={switchTable}
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
        <Tabs className="mx-6 text-slate-500 active:text-main" defaultActiveKey="1" items={items} />
        <ResOrder handleCancel={handleCancel} open={open} />
      </div>
    </>
  );
};

export default ResSelectTable;
