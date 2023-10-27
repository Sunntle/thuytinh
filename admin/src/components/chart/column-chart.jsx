import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
function ColumnChart({ series, colors, customOptions, categories, tooltip, columnWidth = "70%" }) {
  const customize = useSelector(state => state.customize)
  const data = {
    series: series,
    options: {
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
        categories:
          typeof categories === "function" ? categories() : categories,
        tickAmount: 15,
      },
      tooltip: {
        theme: customize.darkMode ? 'dark' : 'light',
        style: {
          fontSize: '12px',
          backgroundColor: "#fc8019"
        },
        ...tooltip
      },
      yaxis: {
        min: 0,
        max: (max) => {
          if (max == 0) return 20
          return max;
        },
        tickAmount: 5,
      },
      ...customOptions,
      colors: colors,
      plotOptions: {
        bar: {
          distributed: false,
          borderRadius: 4,
          rangeBarGroupRows: false,
          columnWidth: columnWidth,
          dataLabels: {
            enabled: false,
          },
        },
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