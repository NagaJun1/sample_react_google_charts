import React from 'react';
import './App.css';
import Chart from 'react-google-charts';

// インストール
// npm install --save react-google-charts

// 公式ドキュメント
// https://www.react-google-charts.com/examples/pie-chart

/** メイン画面 */
const App = () => (
  <div className="App">
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  </div>
);

/** 円グラフのオプション */
export const options = {
  title: "タイトル",
};

/** 円グラフに描写するデータ */
const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export default App;
