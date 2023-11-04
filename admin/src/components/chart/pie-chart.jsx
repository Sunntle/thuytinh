/* eslint-disable react-refresh/only-export-components */
import Chart from "react-apexcharts";
import { Avatar } from 'antd';
import { memo } from "react";



const PieChart = (props) => {
    let top5AndRest = props?.data?.slice(0, 5) || []
    let rest = props?.data?.slice(5).reduce((con, item) => con + item.sold, 0) || 0;
    top5AndRest.push({ name_product: "Sản phẩm còn lại", sold: rest, ImageProducts: [{ url: "https://img.idesign.vn/2023/02/idesign_logogg_1.jpg" }] })
    const total = top5AndRest.reduce((sum, item) => sum + item.sold, 0);
    const data = {
        series: top5AndRest.map(i => i.sold),
        options: {
            labels: top5AndRest.map(i => i.name_product),
            chart: { type: 'donut' },
            dataLabels: { enabled: false }
        }
    };


    return (
        <>
            <Chart options={data.options} series={data.series} type="donut" className="flex justify-center mt-2" />
            <div className='flex flex-col gap-4 mt-4'>
                {top5AndRest.map((item, i) => (
                    <div className='flex justify-center items-center w-full gap-x-5' key={i}>
                        <Avatar shape='square' src={item.ImageProducts?.[0]?.url || ''} className='w-1.5/12 bg-[#fde3cf] text-[#f56a00]' size={40} />
                        <span className='w-8/12 font-medium'>{item.name_product} </span>
                        {/* //({((item.sold / total || 0) * 100).toFixed(2)}%) */}
                        <span className='w-2/12 font-medium text-right'>{item.sold}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default memo(PieChart)
