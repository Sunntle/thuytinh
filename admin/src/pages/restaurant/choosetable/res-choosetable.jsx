import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Tabs, notification, Dropdown } from 'antd';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { AddTable } from '../../../redux/table/tableSystem';
import { getAllTable, getTableId, resetTableApi } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import ResOrder from '../order/res-order';
import { AddTableList, RemoveTableList } from '../../../redux/table/listTableSystem';
import { socket } from '../../../socket';
import Spinner from '../../../components/spinner';
import { RemoveReduxCart } from '../../../redux/cartsystem/cartSystem';
const ButtonTable = ({ table, handleTableClick, handleDetailModal, resetTable }) => (
  <div key={table.id}>
    <span
      className={`w-full flex flex-col h-[200px] items-center justify-center p-4 rounded-lg shadow-md ${table.status_table
        ? 'bg-main text-white border-yellow-400 border-3px border-solid'
        : 'bg-[#D1D5DB] text-white'
        } transition-colors hover:bg-secondaryColor hover:bg-opacity-40 hover:border-yellow-400 hover:border-[3px] hover:border-solid`}
    >

      {table.status_table === 1 && (table.tablebyorders.length === 0 || table.tablebyorders?.[0]?.order?.order_details?.length === 0) && (
        <div className='w-full flex justify-end cursor-pointer'>
          <Dropdown
            menu={{
              items: [{
                key: '1',
                label: (
                  <div className='p-2' onClick={() => resetTable(table)} >Hủy đặt bàn</div>
                ),
              }]
            }}
            placement="top"
            trigger={["click"]}
            arrow
          >
            <MdOutlineRestaurantMenu />
          </Dropdown>
        </div>
      )}

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
  const notifications = useSelector(state => state.notifications)
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const resTable = await getAllTable();
      dispatch(AddTable(resTable));
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu bàn:', error);
    }
  }, []);

  useEffect(() => {
    if (notifications.isLoading == false && notifications.lastNotification !== null && notifications.lastNotification?.type === 'order' && notifications.lastNotification?.status === false) {
      fetchData()
    }
  }, [fetchData, notifications])

  useEffect(() => {
    fetchData();
    socket.on("status table", () => {
      fetchData()
    })
  }, [fetchData])



  const handleTableClick = useCallback(async (index) => {
    const resTableId = await getTableId(index.id, { id_employee: userId });
    if (resTableId.success === false) {
      api.info({
        message: 'Thông báo',
        description:
          resTableId.data
      });
      return
    }
    dispatch(AddTableList(index));
    navigate('/employee/menu/');
  }, [api, dispatch, navigate, userId]);

  const handleDetailModal = useCallback(async (table) => {
    const resTableId = await getTableId(table.id, { id_employee: userId });
    const tableByOrders = resTableId[0].tablebyorders;
    if (tableByOrders && tableByOrders.length === 0 || tableByOrders == undefined) {
      api.info({
        message: 'Thông báo',
        description:
          'Người dùng đang đặt hàng',
      });
    }
    else {
      dispatch(AddTableList(resTableId));
      setOpen(true)
    }
  }, [api, dispatch, userId])

  const handleCancel = useCallback(() => {
    dispatch(RemoveReduxCart())
    dispatch(RemoveTableList())
    setOpen(false);
  }, [dispatch]);

  const resetTable = useCallback(async ({ id }) => {
    const res = await resetTableApi({ tables: [id], reset: true });
    api.success({
      message: 'Thông báo',
      description: res
    });
  }, [api])

  const items = useMemo(() => ([
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
              resetTable={resetTable}
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
  ]), [handleDetailModal, handleTableClick, resetTable, tableData]);

  return (
    <>
      <div className="w-full p-10">
        {loading ? (<Spinner />) : (
          <>
            {contextHolder}
            <Tabs className="mx-6 text-slate-500 active:text-main" defaultActiveKey="1" animated items={items} />
            <ResOrder handleCancel={handleCancel} open={open} />
          </>
        )}

      </div>
    </>
  );
};

export default ResChooseTable;
