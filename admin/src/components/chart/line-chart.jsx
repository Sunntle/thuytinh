
import Chart from "react-apexcharts";
import { Select, Row, Col, Avatar, Progress, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const data = {
    series: [{
        name: 'Thịt chó',
        data: [31, 40, 28, 51, 42, 109, 100, 45, 32, 34, 52, 41]
    }, {
        name: 'Cơm chó',
        data: [11, 32, 45, 32, 34, 52, 41, 51, 42, 109, 100, 40]
    }],
    options: {
        chart: {
            width: '100%',
            type: 'area',
            stacked: false,
            toolbar: {
                show: false
            },

            zoom: {
                enabled: false,
            }
        },
        markers: {
            size: 0,
        },
        dataLabels: { enabled: false },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        xaxis: {
            type: 'category',
            categories: ["T/1", "T/2", "T/3", "T/4", "T/5", "T/6", "T/7", "T/8", "T/9", "T/10", "T/11", "T/12"],
        },
        tooltip: {
            x: {
                format: 'MM'
            },
        },

    },
};


const LineChart = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className="w-full overflow-hidden">
            <Row align={'middle'} justify={'space-between'} className="px-4 mt-4" gutter={[0, 16]}>
                <Col xs={12} className="font-medium text-xl">Order Rate</Col>
                <Col xs={12} className="flex justify-end">
                    <Select
                        className="w-1/3"
                        defaultValue="month"
                        onChange={handleChange}
                        options={[
                            {
                                value: 'month',
                                label: 'Tháng'
                            },
                            {
                                value: 'year',
                                label: 'Năm'
                            }
                        ]}
                    />
                </Col>
                <Col md={12} xs={24}>
                    <Row align={'center'}>
                        <Col xs={3} className="flex justify-center items-center"><UserOutlined className="bg-main text-white p-4 rounded-md" /></Col>
                        <Col xs={7} className="flex justify-center items-center">
                            <div className="flex flex-col justify-between">
                                <span className="text-gray-400 font-medium">Order total</span>
                                <span className="font-medium">259999</span>
                            </div>
                        </Col>
                        <Col xs={12} className="flex justify-center items-center">
                            <div className="flex flex-col justify-between  border-2 w-full p-2 rounded-md">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-400">Target</span><span className="font-medium">2342</span>
                                </div>
                                <Progress percent={50} showInfo={false} className="m-0" strokeColor='#FC8019' />
                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col md={12} xs={24} className="flex justify-end gap-4">
                    <Row className="w-2/5">
                        <Col xs={6}>
                            <div className="wc border-main mt-1"></div>
                        </Col>
                        <Col xs={18}>
                            <div className="text-xs">Month this</div>
                            <div className="font-medium ">230000000</div>
                        </Col>
                    </Row>
                    <Row className="w-2/5">
                        <Col xs={6}>
                            <div className="wc border-main mt-1"></div>
                        </Col>
                        <Col xs={18}>
                            <div className="text-xs">Month this</div>
                            <div className="font-medium ">12323123 </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Chart options={data.options} series={data.series} type="area" className="chart_month" height={300} width={'100%'} />
        </div>

    )
}

export default LineChart
