const ONE_WEEK_MS = 14 * 24 * 60 * 60 * 1000; // One week in milliseconds
const END_DATE = Math.floor(Date.now() / 1000); // Current date in UNIX timestamp
const START_DATE = Math.floor((Date.now() - ONE_WEEK_MS) / 1000); // One week ago in UNIX timestamp
let newChart;

const inputHandling = () => {
    const inputCompanyName = document.querySelector("#textInput").value;
    const start_date_value = document.querySelector("#startDate").value;

    let start_date =
        start_date_value === ""
            ? START_DATE
            : new Date(start_date_value).getTime() / 1000;

    const inputStartDate = start_date - ONE_WEEK_MS / 1000;
    const inputEndDate = start_date;

    console.log(start_date, START_DATE, inputStartDate, inputEndDate);
    let symbol = inputCompanyName === "" ? "TSLA" : inputCompanyName;

    //페이지 이름 변환 및 메인헤드 변경
    const changeMainHeading = document.querySelector("#mainHeading");
    document.title = `${symbol} Stock Data`;
    changeMainHeading.textContent = `${symbol} Stock Data`;

    //url 변경

    // console.log("url", symbol); // <= check the URL
    loadStockData(symbol, inputStartDate, inputEndDate);
};

async function getStockData(url) {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    // just to bypass CORS cross-check
    // your code to get csv data from the yahoo
    console.log(proxyUrl);
    const rep = await fetch("./TSLA2.csv");
    return await rep.text();
}

//
// function getStockData(url) {
//   const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
//   // just to bypass CORS cross-check
//   // your code to get csv data from the yahoo
//   console.log(proxyUrl);
//   const rep = fetch("./TSLA2.csv");
//   return rep.text();
// }


function parseCSVData(csvData) {
    const [header, ...dataList] = csvData.split("\n");
    const splitHeader = header.split(",");
    return dataList.map((data) =>
        data.split(",").reduce((item, value, index) => ({
            ...item,
            [splitHeader[index]]: value
        }), {})
    )

    // your code to get csv data to a list of objects {date; '2024-06-11', open: '173.123121', ... }
    // console.log(csvData);
    //각 열별로 정리
    // const rows = csvData.split("\n");
    // //첫째줄은 컬럼명 배열로 분리
    // const header = rows[0].split(",");
    // //data가 들어갈 빈배열 선언
    // const dataObjs = [];
    // const data = csvData.slice(1);
    // console.log(data)
    // data.map(row => {
    //   row.split(',');
    // }).reduce((acc, cur) => {
    //   //객체를 만들고
    //   //객체[키] = 벨류
    //   //obj
    //   return acc + cur
    // })

    // map , reduce, filter, foreach
    // for (let i = 1; i < rows.length; i++) {
    //   const values = rows[i].split(",");
    //   if (values.length === header.length) {
    //     const obj = {};
    //     for (let j = 0; j < header.length; j++) {
    //       obj[header[j]] = values[j];
    //     }
    //     data.push(obj);
    //   } else {
    //     console.log("데이터 정렬이 필요합니다.");
    //   }
    // }


    // console.log(data);
    // return dataObjs;
}

function createChart(stockData) {
    const dates = stockData.map((item) => item.Date);
    const opens = stockData.map((item) => parseFloat(item.Open));
    const highs = stockData.map((item) => parseFloat(item.High));
    const lows = stockData.map((item) => parseFloat(item.Low));
    const closes = stockData.map((item) => parseFloat(item.Close));

    const ctx = document.getElementById("myChart");
    if (newChart !== undefined) {
        newChart.destroy();
    }
    newChart = new Chart(ctx, {
        type: "line",
        data: {
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
                    label: "High",
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
                    label: "Low",
                    data: lows,
                    borderColor: "rgb(10, 100, 100)",
                    borderWidth: 1,
                    fill: false,
                },
            ],
        },
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: "linear",
                    from: 1,
                    to: 0,
                    loop: false,
                },
            },
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
        },
    });
}

function populateStockTable(stockData) {
    const tableBody = document.querySelector("#stockTable tbody");
    tableBody.innerHTML = "";
    stockData.forEach((it) => {
        tableBody.innerHTML += `<tr>
      <td>${it.Date}</td>
      <td>${it.Open}</td>
      <td>${it.High}</td>
      <td>${it.Low}</td>
      <td>${it.Close}</td>
      <td>${it.Volume}</td>
    </tr>`;
    });
    // your code to insert table body to existing yahoo.html
}

async function loadStockData(symbol = "TSLA", inputStartDate, inputEndDate) {
    try {
        // console.log(symbol);
        let url = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}?period1=${inputStartDate}&period2=${inputEndDate}&interval=1d&events=history`;
        // console.log(url);

        const csvData = await getStockData(url);
        const stockData = parseCSVData(csvData);
        createChart(stockData);
        populateStockTable(stockData);
    } catch (error) {
        console.error("Failed to fetch stock data:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadStockData("TSLA", START_DATE, END_DATE);
});
