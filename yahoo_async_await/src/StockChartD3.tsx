// import {StockData} from "./model.ts";
// import React, {FunctionComponent, useEffect, useRef} from "react";
// import * as d3 from "d3"
//
// interface Props {
//     stockData: StockData[];
// }
//
// export const StockChartD3:FunctionComponent<Props> = ({stockData
//                                                }) => {
//         const width = 640;
//         const height = 400;
//         const marginTop = 20;
//         const marginRight = 20;
//         const marginBottom = 20;
//         const marginLeft = 20;
//         const gx:React.MutableRefObject<SVGGElement | any> = useRef();
//         const gy:React.MutableRefObject<SVGGElement | any>  = useRef();
//         const x = d3.scaleLinear([0, stockData.length - 1], [marginLeft, width - marginRight]);
//         const y = d3.scaleLinear(d3.extent(stockData), [height - marginBottom, marginTop]);
//         const line = d3.line((d:number, i:number) => x(i), y);
//         useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
//         useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
//         return (
//             <svg width={width} height={height}>
//                 <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
//                 <g ref={gy} transform={`translate(${marginLeft},0)`} />
//                 <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(stockData)} />
//                 <g fill="white" stroke="currentColor" strokeWidth="1.5">
//                     {stockData.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
//                 </g>
//             </svg>
//     );
// }