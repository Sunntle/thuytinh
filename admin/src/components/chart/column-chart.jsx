import Chart from "react-apexcharts";
function ColumnChart({ series, colors, customOptions, categories }) {
  const handleArrCategories = () => {
    const numbersArray = [];
    for (let i = 1; i <= categories; i++) {
      numbersArray.push(i);
    }
    return numbersArray;
  };
  const data = {
    series: series,
    options: {
      ...customOptions,
      colors: colors,
      plotOptions: {
        bar: {
          distributed: false,
          borderRadius: 4,
          rangeBarGroupRows: false,
          columnWidth: "70%",
          dataLabels: {
            enabled: false,
          },
        },
      },
      xaxis: {
        type: "category",
        categories: handleArrCategories(),
      },
    },
  };

  return (
    <Chart
      options={data.options}
      series={data.series}
      type="bar"
      className="chart_month max-w-[882px]"
      height={200}
      width={"100%"}
    />
  );
}

export default ColumnChart;
