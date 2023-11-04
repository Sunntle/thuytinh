import Chart from "react-apexcharts";
import { useSelector } from "react-redux";


const LineChart = ({ series, labels, yaxis, dataLabels, tooltipCus, customClassName, children }) => {
    const customize = useSelector(state => state.customize)
    const data = {
        series,
        options: {
            chart: {
                stacked: false,
                toolbar: { show: false },
                zoom: { enabled: false },
            },

            stroke: {
                width: [0, 2, 5],
                curve: 'smooth'
            },

            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                }
            },
            labels,
            dataLabels,
            yaxis,
            plotOptions: {
                bar: {
                    columnWidth: "20px",
                    dataLabels: {
                        enabled: false,
                    },
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                theme: customize.darkMode ? 'dark' : 'light',
                y: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        return (
                            '<div class="arrow_box">' +
                            "<span>" +
                            w.globals.labels[dataPointIndex] +
                            ": " +
                            series[seriesIndex][dataPointIndex] +
                            "</span>" +
                            "</div>"
                        )
                    }
                },
                ...tooltipCus
            }
        }
    }


    return (
        <div>
            {children}
            <Chart className={customClassName ? customClassName : ""} options={data.options} series={data.series} type="area" height={350} />
        </div >

    )
}

export default LineChart
