import React from "react";
import {StockData} from "./model.ts";
// 객체 타입으로 받을 때는 매번 이렇게 해줘야 되나?
// 다른 방법은 없나?
// FC의 경우도 있던데;;; 잘 안되더라
// 템플릿 리터럴로 했을 때 잘 안되더라 - 해결


interface StockTableProps {
    stockData: StockData[];
}

export const StockData: React.FC<StockTableProps> = (props.stockData) => {
    console.log(props.stockData)
    return (
        <>
            <div className={"stock-data"}>
                <table id="stockTable">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.stockData.map((data: StockData,idx:number) => (
                        <tr key={idx}>
                            <td>{data.Date}</td>
                            <td>{data.Open}</td>
                            <td>{data.High}</td>
                            <td>{data.Low}</td>
                            <td>{data.Close}</td>
                            <td>{data.Volume}</td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

