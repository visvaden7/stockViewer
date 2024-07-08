import './App.css'
// import {useEffect, useMemo, useState} from "react";
import {StockViewer} from "./StockViewer.tsx";

// import {Line} from "react-chartjs-2";


function App() {


    // const [endDate, setEndDate] = useState();
    // const [ticker, setTicker] = useState();
    // const [stockData, setStockData] = useState('')
    //
    // async function getStockData(url: string) {
    //     try {
    //         // const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    //         const data: Response = await fetch(url);
    //         if (!data.ok) {
    //             throw new Error(`HTTP error! Status: ${data.status}`)
    //         }
    //         const csvText: string = await data.text()
    //         setStockData(csvText)
    //     } catch (error) {
    //         console.error('Error fetching stock data:', error);
    //     }
    // }
    //
    // const parseStockData = (stockData: string) => {
    //     const [header, ...contents] = stockData.split('\n')
    //     const splitHeader = header.split(',')
    //     return contents.map(content =>
    //         content.split(',').reduce((item: {}, value: string, Index: number) => ({
    //             ...item,
    //             [splitHeader[Index]]: value
    //         }), {})
    //     )
    // };
    //
    // const parsedData = useMemo(() => {
    //     console.log(JSON.stringify(parseStockData(stockData)));
    //     return parseStockData(stockData)
    // }, [stockData])
    //
    // useEffect(() => {
    //     let uri: string = "/dummyData/TSLA2.csv"
    //
    //     const loadStockData = async () => {
    //         await getStockData(uri)
    //
    //     }
    //     loadStockData()
    // }, [stockData])


    return (
        <>
            <StockViewer/>
            {/*<div className={"container"}>*/}
            {/*    <InputBox/>*/}
            {/*    /!*<StockChart stockData={parsedData}/>*!/*/}
            {/*    <StockData stockData={parsedData}/>*/}
            {/*</div>*/}
        </>
    )
}

export default App
