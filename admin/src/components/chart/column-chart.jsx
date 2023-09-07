import Chart from "react-apexcharts";
const content = ()=>{
    const arr = []
    for(let i = 0; i<7;i++){
        arr.push(Math.round(Math.random()*100))
    }
    return arr
  }
function ColumnChart() {
  
    const data = {
        series: [
          {
            data: content(),
          },
          {
            data: content(),
          },
        ],
        xaxis: {
          categories: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7"],
        },
        yaxis: [
          {
            title: {
              text: "sdadasds",
            },
          },
          {
            opposite: true,
            title: {
              text: "a",
            },
          },
        ],
        options: {
          plotOptions: {
            bar: {
              distributed: false,
            },
          },
        },
      };
      
      
  return (
    <Chart
    options={data.options}
    series={data.series}
    type="bar"
    className="chart_month"
    height={"200px"}
    width={"100%"}
  />
  )
}

export default ColumnChart