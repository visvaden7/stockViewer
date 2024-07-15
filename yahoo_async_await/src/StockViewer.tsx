import {FunctionComponent, useEffect, useState} from "react";
import {StockTable} from "./StockTable.tsx";
import {StockData} from "./model.ts";
import StockChart from "./StockChart.tsx";
import {StockChartD3} from "./StockChartD3.tsx";


const MILLISECOND = 60* 60
const DAY = 24
const ONE_WEEK = 7*DAY*MILLISECOND

export const StockViewer: FunctionComponent = () => {
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [ticker, setTicker] = useState('TSLA')
    const [date, setDate] = useState(Math.floor(Date.now()/1000))

    async function getStockData(url: string) {
        try {
            const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
            const data: Response = await fetch(proxyUrl);

            return await data.text()
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }

    const parseStockData = (stockData: string):StockData[] => {
        const [headers, ...contents] = stockData.split("\n")
        const splitHeaders = headers.split(',')
        //TODO: data 처리 방법을 조금더 깔끔하게 만드는 방법
        return contents.map(content =>
            content.split(',').reduce((item, value, index) => {
                return splitHeaders[index] !== "Adj Close"
                    ? splitHeaders[index] !== "Date"
                        ? ({...item, [splitHeaders[index]]: Number(value)})
                        : ({...item, [splitHeaders[index]]: value})
                    : item
                // if(splitHeaders[index] !== "Adj Close") {
                //     if(splitHeaders[index] !== "Date") {
                //         return {
                //             ...item,
                //             [splitHeaders[index]]: Number(value)
                //         }
                //     }else {
                //         return {
                //             ...item,
                //             [splitHeaders[index]]: value
                //         }
                //     }
                // }
                // return item
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
        let url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${date-ONE_WEEK}&period2=${date}&interval=1d&events=history`;
        console.log(date, date-ONE_WEEK)
        console.log(url)



        const loadStockData = async () => {
            const csvData = await getStockData(url) ?? ''
            setStockData(parseStockData(csvData))

        }
        //TODO: 이 부분도 간결하게 바꿔줄 수 있을 것 같아
        loadStockData()
    }, [ticker,date]);

    return (
        <div className={"stock-viewer"}>
            <h1>{ticker} STOCK TABLE</h1>
            <div>
                <input id="tickerValue" value={ticker} type={"text"} onChange={(e)=> setTicker((e.target.value).toUpperCase())}/>
                <input id="end-date" value={stockData.length > 0 ? stockData[stockData.length-1].Date : "2024-02-23" } type={"date"}  onChange={(e) => setDate(new Date(e.target.value).getTime()/1000)}/>
                <button>query</button>
            </div>
            {stockData.length > 0 && (
                <>
                    {/*<StockChartD3 stockData={stockData} />*/}
                    <StockChart stockData={stockData} />
                    <StockTable stockData={stockData}/>
                </>
            )}
        </div>
    )
}

