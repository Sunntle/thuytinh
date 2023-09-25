
import Chart from "react-apexcharts";
import { Avatar } from 'antd';



const PieChart = (props) => {

    const data = {
        series: props?.data?.map(item => item.productCount),
        options: {
            legend: { show: false },
            labels: props.data.map(item => item.name_category),
            chart: { type: 'donut' },
            dataLabels: { enabled: false }
        }
    };

    const calculatePercentage = (name_category) => {
        const total = props?.data.reduce((sum, item) => sum + item.productCount, 0);
        const percentages = props?.data.reduce((result, item) => {
            result[item.name_category] = ((item.productCount / total) * 100).toFixed(2);
            return result;
        }, {});
        return percentages[name_category] || 0;
    };

    return (
        <>
            <Chart options={data.options} series={data.series} type="donut" width={300} className="flex justify-center p-3" />
            <div className='flex flex-col gap-4'>
                {props?.data.map((item, i) => (
                    <div className='flex justify-center items-center w-full gap-x-5' key={i}>
                        <Avatar shape='square' src={item.thumbnail} className='w-1.5/12 bg-[#fde3cf] text-[#f56a00]' />
                        <span className='w-8/12 font-medium'>{item.name_category} ({calculatePercentage(item.name_category)}%) </span>
                        <span className='w-2/12 font-medium'>{item.productCount}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
export default PieChart
