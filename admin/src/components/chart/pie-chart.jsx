
import Chart from "react-apexcharts";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import { Avatar, Space } from 'antd';

// ChartJS.register(ArcElement, Tooltip, Legend);


// const data = {
//     labels: ['Thịt chó', 'Bê thui', 'Hột vịt lộn', 'Má heo'],
//     total: [12, 19, 3, 5],
//     bg: [
//         'rgba(255, 99, 132)',
//         'rgba(54, 162, 235)',
//         'rgba(255, 206, 86)',
//         'rgba(75, 192, 192)',
//     ]
// }
// const result = {
//     labels: data.labels,
//     datasets: [
//         {
//             backgroundColor: data.bg,
//             data: data.total,
//         },
//     ]
// };
// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             display: false,
//         }
//     }
// };


const data = {

    series: [20, 13, 33, 45],
    options: {
        legend: { show: false },
        labels: ['Thịt chó', 'Bê thui', 'Hột vịt lộn', 'Má heo'],
        chart: { type: 'donut' },
        dataLabels: { enabled: false }
    }
};


const PieChart = () => {
    return (
        <>

            <Chart options={data.options} series={data.series} type="donut" width={300} className="flex justify-center p-3" />
            <div className='flex flex-col gap-4'>
                <div className='flex justify-center items-center w-full gap-x-5'>
                    <Avatar shape='square' style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} className='w-1.5/12' />
                    <span className='w-8/12 font-medium'>rtwert5t</span>
                    <span className='w-2/12 font-medium'>123</span>
                </div>
                <div className='flex justify-center items-center w-full gap-x-5'>
                    <Avatar shape='square' style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} className='w-1.5/12' />
                    <span className='w-8/12 font-medium'>rtwert5t</span>
                    <span className='w-2/12 font-medium'>123</span>
                </div>
                <div className='flex justify-center items-center w-full gap-x-5'>
                    <Avatar shape='square' style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} className='w-1.5/12' />
                    <span className='w-8/12 font-medium'>rtwert5t</span>
                    <span className='w-2/12 font-medium'>123</span>
                </div>
                <div className='flex justify-center items-center w-full gap-x-5'>
                    <Avatar shape='square' style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} className='w-1.5/12' />
                    <span className='w-8/12 font-medium'>rtwert5t</span>
                    <span className='w-2/12 font-medium'>123</span>
                </div>
            </div>
        </>
    )
}
export default PieChart
