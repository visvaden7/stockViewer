import {StockData} from "./model.ts";
import {FunctionComponent} from "react";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement,} from "chart.js";

interface Props {
    stockData: StockData[];
}


const StockChart: FunctionComponent<Props> = ({stockData}) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
    // TODO: reduce와 map을 이용하여 구조분해를 사용하면 가능할 것 같은데
    // const [dates, opens, highs, lows, closes] = stockData
    // 지원이 멈췄으니 설명이 가능하니? 다른 라이브러리를 사용해보자

    const dates = stockData.map((item) => item.Date);
    const opens = stockData.map((item) => item.Open);
    const highs = stockData.map((item) => item.High);
    const lows = stockData.map((item) => item.Low);
    const closes = stockData.map((item) => item.Close);
    // console.log(dates, opens, highs, lows, closes)
    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "OPEN",
                data: opens,
                borderColor: "rgb(255, 150, 10)",
                borderWidth: 1,
                fill: false,
            },
            {
                label: "HIGH",
                data: highs,
                borderColor: "rgb(130, 100, 100)",
                borderWidth: 1,
                fill: false,
            },
            {
                label: "CLOSE",
                data: closes,
                borderColor: "rgb(140, 230, 192)",
                borderWidth: 1,
                fill: false,
            },
            {
                label: "LOWS",
                data: lows,
                borderColor: "rgb(10, 100, 100)",
                borderWidth: 1,
                fill: false,
            },
        ]
    }

    const options = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Date",
                },
                // defining min and max so hiding the dataset does not change scale range
                // min: 150,
                // max: 200,
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "PRICE",
                },
                // defining min and max so hiding the dataset does not change scale range
                // min: 150,
                // max: 200,
            },
        },
    }


    return (
        <Line data={chartData} options={options}/>
    )
}
export default StockChart;