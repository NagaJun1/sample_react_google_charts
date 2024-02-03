import Chart, { ReactGoogleChartEvent } from 'react-google-charts';
import '../css/BarChart.css';

const BarChart = () => {
  return (<>
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      chartEvents={chartEvents}
    />
  </>);
}

/** チャートのイベント */
const chartEvents: ReactGoogleChartEvent[] = [{
  eventName: "select",
  callback({ chartWrapper }) {
    console.log(chartWrapper.getChart().getSelection())

    // チャートの選択項目変更で、ラベルを書き換え
    let selectedIndex = chartWrapper.getChart().getSelection()[0].row;
    if (0 <= selectedIndex) {
      console.log("selected : " + selectedIndex)
    }
  }
}];

/** グラフに表示するデータ */
export const data = [
  ["month", "value1", "value2", "value3"],
  ["１月", 1000, 1100, 1200],
  ["２月", 2000, 2100, 2200],
  ["３月", 3000, 3100, 3200],
  ["４月", 4000, 4100, 4200],
  ["５月", 5000, 1500, 2500],
];

/** グラフのオプション */
export const options = {
  title: "タイトル",
  isStacked: true, // 積上表示
  chartArea: { width: "50%" },
  hAxis: {
    title: "value",
    minValue: 0,
  },
  vAxis: {
    // title: "月",
  },
};

export default BarChart;