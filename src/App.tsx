import React, { ReactElement, useState } from 'react';
import './css/App.css';
import Chart, { ReactGoogleChartEvent } from 'react-google-charts';
import BarChart from './ts/BarChart';

/** メイン画面 */
const App = () => {

  // チャートに割り振るシード値
  const [chartSeed, setChartSeed] = useState(1);
  let reLoadChart = function () {
    // チャートのシード値を更新することで、再読み込みする
    setChartSeed(Math.random());
  }

  // 選択されたアイテムを取得
  const [selectedItem, setSelectedItem] = useState("");

  /** data の 要素の編集テキストボックス */
  const Editors = () => {
    let inputs: ReactElement[] = [];

    // 各要素のエディタを追加
    chartData.forEach((data1, index) => {
      if (index != 0) { // インデックス 0 に対しての項目は不要

        // 該当項目の数値を「val」分増やす
        let addValue = function (val: number) {
          console.log('change value');
          let dataVal = checkNumber(chartData[index][1]) + val;
          if (0 < dataVal) {
            chartData[index][1] = dataVal;

            // チャートを再読み込み
            reLoadChart();
          }
        }

        inputs.push(<div key={index} className='flex min_width200 bg_gray margin10 padding5'>
          <p>{data1[0]}</p>
          <button className='margin10 padding5' onClick={() => {
            addValue(1);
          }}>+1</button>

          <button className='margin10 padding5' onClick={() => {
            addValue(-1);
          }}>-1</button>
        </div>);
      }
    })
    return (<>{inputs}</>);
  }

  /** チャートのイベント */
  const chartEvents: ReactGoogleChartEvent[] = [{
    eventName: "select",
    callback({ chartWrapper }) {
      // チャートの選択項目変更で、ラベルを書き換え
      let selectedIndex = chartWrapper.getChart().getSelection()[0].row;
      if (0 <= selectedIndex) {
        setSelectedItem(chartData[selectedIndex + 1][0].toString());
      }
    }
  }];

  return (<>
    <div className='margin20'>
      <p className='margin10'>ソースコード</p>
      <a href='https://github.com/NagaJun1/sample_react_google_charts'>
        https://github.com/NagaJun1/sample_react_google_charts
      </a>
    </div>
    <div className="App flex">
      <div className='margin30 min_width100'>
        <Editors />
        <div className='min_width100 margin10 padding5 bg_blue'>
          <h3>selected：</h3>
          <h3>{selectedItem}</h3>
        </div>
      </div>
      <Chart
        className='max_width800'
        key={chartSeed}
        chartType="PieChart"
        data={chartData}
        options={CHART_OPTIONS}
        width={"100%"}
        height={"500px"}
        chartEvents={chartEvents}
      />
    </div>
    <BarChart />
  </>);
}

/** 円グラフに描写するデータ */
let chartData = [
  ["Data", "value"],
  ["データ１", 11],
  ["データ２", 2],
  ["データ３", 2],
  ["データ４", 2],
  ["データ５", 7],
];

/**
 * 引数「val」が数値であることをチェック
 * @param val チェック対象の値
 * @returns 変換後の数値
 */
function checkNumber(val: any): number {
  let number = Number(val);
  if (0 < number) {
    return number;
  }
  return 0;
}

/** 円グラフのオプション */
export const CHART_OPTIONS = {
  legend: "none",
  pieSliceText: "label", // 円グラフの各項目の表示形式
  title: "タイトル",
  pieStartAngle: 100,

  // TODO ↓ アニメーションできる？
  animation: {
    duration: 1000,
    easing: 'out',
  }
};

export default App;
