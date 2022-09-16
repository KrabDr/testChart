import React from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import {Tooltip} from "./Tooltip";
import {Axis, Orient} from "./Axis";


const defaultMargin = {top: 50, left: 50, right: 50, bottom: 50};

interface Point {
    month: string;
    score: number;
}


interface Props {
    data: Point[][];
    margin?: { left?: number; right?: number; top?: number; bottom?: number };
}

export const ScoreChart: React.FC<Props> = ({data, margin: incomingMargin}) => {
    const [ref, bounds] = useMeasure({debounce: 50});
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [currentHover, setCurrentHover] = React.useState<Point | null>(null);
    const margin = {...defaultMargin, ...incomingMargin};
    const availableArea = {
        width: bounds.width - margin.left - margin.right,
        height: bounds.height - margin.top - margin.bottom
    };
    const mArray = data.reduce((acc: any, val: any) => [...acc, ...val.map((v: any) => v.month)], []);
    const monthArray = [...new Set(mArray) as any];


    const x = d3
        .scalePoint()
        .rangeRound([0, availableArea.width])
        .domain(monthArray.map((dat) => dat.toString()))
        .padding(0.1)

    const y = d3
        .scaleLinear()
        .rangeRound([availableArea.height, 0])
        .domain([0, 100])


    const line = d3
        .line<Point>()
        .x((d) => x(d.month)!)
        .y((d) => y(d.score))


    return (
        <div
            ref={ref}
            style={{width: '100%', height: '100%', position: 'relative'}}
        >
            <svg
                ref={svgRef}
                width={bounds.width}
                height={bounds.height}
                style={{color: "#BABDC2"}}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g transform={`translate(0,${availableArea.height})`}>
                        <Axis scale={x} orient={Orient.top}/>
                    </g>
                    <g>
                        <Axis scale={y} orient={Orient.left} tickSize={-availableArea.width} tickSizeOuter={0}/>
                    </g>
                    <rect
                        className="frame"
                        width={availableArea.width}
                        height={availableArea.height}
                        fill="none"
                        stroke="#ECEDEE"
                        strokeWidth="2"
                    />

                    {data.map((item) =>
                        <path
                            className="line"
                            d={line(item)!}
                            fill="none"
                            strokeWidth="2"
                            stroke="red"
                        />)}

                    <g className="dots">
                        {data.map((points) => points.map((point) =>
                            (<circle
                                    key={`point-${point.month}`}
                                    r="4"
                                    cx={x(point.month)}
                                    cy={y(point.score)}
                                    fill={"#D9D9D9"}
                                    stroke={"#ffffff"}
                                    strokeWidth={1}
                                    onMouseMove={() => setCurrentHover(point)}
                                    onMouseLeave={() => setCurrentHover(null)}
                                />
                            )))}
                    </g>
                </g>
            </svg>
            {currentHover ? (
                <Tooltip style={{top: "-5px"}}
                         left={x(currentHover.month!)! + margin.left + "px"}
                         top={y(currentHover.score) + margin.top + "px"}>
                    <div>
                        <div>{currentHover.month}</div>
                        <div>{currentHover.score}</div>
                    </div>
                </Tooltip>
            ) : null}
        </div>
    );
};

