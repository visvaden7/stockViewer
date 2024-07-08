import {FunctionComponent, useEffect, useState} from "react";
import {StockTable} from "./StockTable.tsx";
import {StockData} from "./model.ts";
import StockChart from "./StockChart.tsx";

const ONE_WEEK = 14*24*60*60
export const StockViewer: FunctionComponent = () => {
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [ticker, setTicker] = useState('TSLA')
    const [date, setDate] = useState(Math.floor(Date.now()/1000))
    console.log(date, ONE_WEEK)
    const setHandler = () => {
        //TODO: data처리 다시 하기
        let tickerName = document.getElementById("tickerValue")?.value
        console.log(tickerName, ticker)
        setTicker(tickerName.toUpperCase())
        // console.log(document.getElementById("end-date")?.value)
        let endDate = new Date(document.getElementById("end-date")?.value).getTime() /1000

        setDate(endDate ?? Date.now()/1000)
        console.log(endDate, date)
        // console.log(ticker)
        // console.log(date)
    }
    async function getStockData(url: string) {
        try {
            const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
            const data: Response = await fetch(proxyUrl);
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`)
            }
            return await data.text()
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }

    const parseStockData = (stockData: string):StockData[] => {
        const [headers, ...contents] = stockData.split("\n")
        const splitHeaders = headers.split(',')
        return contents.map(content =>
            content.split(',').reduce((item, value, index) => {
                if(splitHeaders[index] !== "Adj Close") {
                    if(splitHeaders[index] !== "Date") {
                        return {
                            ...item,
                            [splitHeaders[index]]: Number(value)
                        }
                    }else {
                        return {
                            ...item,
                            [splitHeaders[index]]: value
                        }
                    }
                }
                return item
            }, {} as StockData))




        // const [header, ...contents] = stockData.split('\n')
        // const splitHeader = header.split(',')
        // return contents.map(content =>
        //     content.split(',').reduce((item: {}, value: string, Index: number) => ({
        //         ...item,
        //         [splitHeader[Index]]: value
        //     }), {})
        // )
    };

    useEffect(() => {
        // let uri: string = "/dummyData/TSLA2.csv"
        // 1719244054 1719244054 1718034454 1719244054
        // https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/TSLA?period1=1719244054&period2=1720453654&interval=1d&events=history
        // https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/TSLA?period1=510853594&period2=1720453594&interval=1d&events=history
        let url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${date-ONE_WEEK}&period2=${date}&interval=1d&events=history`;
        console.log(date, date-ONE_WEEK)
        console.log(url)
        const loadStockData = async () => {
            const csvData = await getStockData(url) ?? ''
            setStockData(parseStockData(csvData))

        }
        loadStockData()

        // setStockData([{
        //     Date: "2024-06-17",
        //     Open: 177.919998,
        //     High: 188.809998,
        //     Low: 177.000000,
        //     Close: 187.440002,
        //     Volume: 109786100
        // }, {
        //     Date: "2024-06-18",
        //     Open: 186.559998,
        //     High: 187.199997,
        //     Low: 182.369995,
        //     Close: 184.860001,
        //     Volume: 68982300
        // }, {
        //     Date: "2024-06-20",
        //     Open: 184.679993,
        //     High: 185.210007,
        //     Low: 179.660004,
        //     Close: 181.570007,
        //     Volume: 55893100
        // }, {
        //     Date: "2024-06-21",
        //     Open: 182.300003,
        //     High: 183.949997,
        //     Low: 180.690002,
        //     Close: 183.009995,
        //     Volume: 61937300
        // }])
    }, [ticker,date]);

    return (
        <div className={"stock-viewer"}>
            <h1>{ticker} STOCK TABLE</h1>
            <div>
                <input id="tickerValue" type={"text"}/>
                <input id="end-date" type={"date"}/>
                <button onClick={setHandler}>query</button>
            </div>
            <StockChart stockData={stockData} />
            <StockTable stockData={stockData}/>
        </div>
    )
}

