import React from 'react'
import { Col, Row, Tabs } from 'antd';
import ResPayment from '../payment/res-payment';
import { ButtonTable } from './ButtonTable';

const ResChooseTable = () => {
  const items = [
    {
        key: '1',
        label: `Tất cả`,
        children: <ButtonTable />,
    },
    {
        key: '2',
        label: `Ngoài trời`,
        children: <ButtonTable />,
    },
    {
        key: '3',
        label: `Phòng`,
        children: <ButtonTable />,
    },
];
  return (
    <>
     <div className='w-full p-10'>
      {/* <Row gutter={[32, 16]}>
        <Col xs={24} lg={16}> */}
          <Tabs className='mx-6 text-main active:text-main' defaultActiveKey="1" items={items} />
        {/* </Col> */}
        {/* <Col xs={24} lg={8} className='flex flex-col gap-y-4'>
          <ResPayment/>
        </Col> */}
      {/* </Row> */}
     
     </div>
    </>
    
  )
}
export default ResChooseTable;
