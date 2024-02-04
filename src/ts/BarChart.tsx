import Chart, { ReactGoogleChartEvent } from 'react-google-charts';
import '../css/BarChart.css';
import { useState } from 'react';

const BarChart = () => {
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(0);

  /** 棒グラフのイベント */
  const chartEvents: ReactGoogleChartEvent[] = [{
    eventName: "select",
    callback({ chartWrapper }) {
      console.log(chartWrapper.getChart().getSelection())

      // チャートの選択項目変更で、ラベルを書き換え
      let select = chartWrapper.getChart().getSelection()[0];
      setSelectedRow(Number(select.row));
      setSelectedColumn(Number(select.column));
    }
  }];

  return (<>
    <div className='flex'>
      <div className='margin20'>
        <div className='min_width150 margin10 padding5 bg_blue'>
          <h3>selected Row：</h3>
          <h3>{CHART_DATA[selectedRow + 1][0]}</h3>
        </div>
        <div className='min_width150 margin10 padding5 bg_blue'>
          <h3>selected Column：</h3>
          <h3>{CHART_DATA[0][selectedColumn]}</h3>
        </div>
      </div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={CHART_DATA}
        options={options}
        chartEvents={chartEvents}
      />
    </div>
  </>);
}

/** グラフに表示するデータ */
export const CHART_DATA = [
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