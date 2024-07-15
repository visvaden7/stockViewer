import {FunctionComponent} from "react";
import {StockData} from "./model.ts";

interface Props {
    stockData: StockData[];
}

export const StockTable: FunctionComponent<Props> = ({stockData}) => {

    console.log(stockData[0].Date)
    const headers = []
    for(let key in stockData[0]){
        headers.push(key)
    }
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header,idx) => <td key={idx}>{header}</td>)}
                </tr>
            </thead>
            <tbody>
            {stockData.map(({Date, Low, High, Volume, Open, Close}, idx) => (
                <tr key={idx}>
                    <td>{Date}</td>
                    <td>{Open}</td>
                    <td>{High}</td>
                    <td>{Low}</td>
                    <td>{Close}</td>
                    <td>{Volume}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}