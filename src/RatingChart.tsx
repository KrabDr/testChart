import React from "react";
import * as d3 from "d3";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import color from "color";
import throttle from "lodash.throttle";
import { ToolTip } from "./ToolTip";
import { data1 } from "./data";

const formatDate = (date: string | Date): string => {
  if (typeof date === "string") {
    return date;
  }

  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

const bisectX = d3.bisector<Point, Point["date"]>((d) => d.date).left;
const bisect = (data: Point[], date: Date) => {
  const i = bisectX(data, date, 1, data.length - 1);
  const a = data[i - 1];
  const b = data[i];

  const delta = {
    a: date.getTime() - a.date.getTime(),
    b: b.date.getTime() - date.getTime()
  };

  return delta.a > delta.b
    ? { index: i, value: b }
    : { index: i - 1, value: a };
};

const getRatingColor = (rating: number, ratings: Rating[]): string => {
  const highestMatchingRating = ratings
    ?.filter(({ value }) => {
      return rating >= value;
    })
    .pop();

  return highestMatchingRating?.color ?? "black";
};

const defaultMargin = { top: 50, left: 50, right: 50, bottom: 50 };

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

interface Point {
  date: Date; // TODO: date? convert from string? timestamp?
  value: number;
}

interface Rating {
  value: number;
  color: string;
}

interface Props {
  data: Point[];
  /**
   * a list of ratings thresholds and their colors
   * e.g. if value=50 then that color will be used for
   * values 50 and up until any higher threshold
   */
  ratings: Rating[];
  margin?: { left?: number; right?: number; top?: number; bottom?: number };
}
export const RatingChart: React.FC<Props> = ({
  data,
  ratings,
  margin: incomingMargin
}) => {
  console.log(data1);
  const [ref, bounds] = useMeasure({ debounce: 50 });
  const svgRef = React.useRef<SVGSVGElement>(null);
  const yAxisRef = React.useRef<SVGGElement>(null);
  const [currentHover, setCurrentHover] = React.useState<Point | null>(null);

  const margin = { ...defaultMargin, ...incomingMargin };
  const graphColor = getRatingColor(data[data.length - 1].value, ratings);
  const availableArea = {
    width: bounds.width - margin.left - margin.right,
    height: bounds.height - margin.top - margin.bottom
  };

  const throttledSetCurrentHover = throttle(setCurrentHover, 500);

  // x() and y() maps domain to range; i.e. real values to x and y screen coordinate
  const x = d3
    .scaleTime()
    .rangeRound([0, availableArea.width])
    .domain(d3.extent(data, (d) => d.date) as [Date, Date]);

  const y = d3
    .scaleLinear()
    .rangeRound([availableArea.height, 0])
    .domain([0, 100]);

  const line = d3
    .line<Point>()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveCatmullRom);

  const area = d3
    .area<Point>()
    .x((d) => x(d.date))
    .y0(() => y(1))
    .y1((d) => y(d.value))
    .curve(d3.curveCatmullRom);

  // create gradient
  const areaColors = {
    top: color(graphColor).alpha(0.5).toString(),
    middle: color(graphColor).alpha(0.3).toString(),
    bottom: color(graphColor).alpha(0).toString()
  };

  // RENDER
  // frame
  // dots
  // tooltip?!
  React.useEffect(() => {
    // We need d3 to render and control the axis. so give it a ref to play with.
    if (yAxisRef.current) {
      d3.select(yAxisRef.current)
        .call(
          d3
            .axisRight(y)
            .tickValues([0, 36, 70, 96])
            .tickFormat((d) => `${d}+`)
            .tickSize(availableArea.width)
        )
        .call((d) => d.select(".domain").remove())
        .call((d) =>
          d
            .selectAll(".tick line")
            // .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2, 2")
        )
        .call((d) => d.select(".tick:first-of-type line").remove())
        .call((d) =>
          d
            .selectAll(".tick text")
            .attr("x", -5)
            .attr("text-anchor", "end")
            .style("font-size", "11px")
        );
    }
  });

  return (
    <Container
      ref={ref}
      onPointerMove={(e) => {
        const posX = e.nativeEvent.clientX - bounds.x;

        const closest = bisect(data, x.invert(posX - margin.left));
        // TODO: move bisect to throttle
        throttledSetCurrentHover(closest.value);
      }}
      onPointerLeave={() => setCurrentHover(null)}
    >
      <svg
        ref={svgRef}
        width={bounds.width}
        height={bounds.height}
        style={{ color: "#BABDC2" }}
      >
        <defs>
          <linearGradient id="area-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={areaColors.top} />
            <stop offset="80%" stopColor={areaColors.middle} />
            <stop offset="100%" stopColor={areaColors.bottom} />
          </linearGradient>
        </defs>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <rect
            className="frame"
            width={availableArea.width}
            height={availableArea.height}
            fill="none"
            stroke="#ECEDEE"
            strokeWidth="2"
          />
          <g className="y-axis" ref={yAxisRef}></g>
          <path
            className="area"
            d={area(data) ?? undefined}
            fill="url(#area-gradient)"
          />

          <path
            className="line"
            d={line(data) ?? undefined}
            fill="none"
            strokeWidth="2"
            stroke={graphColor}
          />
          <g className="dots">
            {data.map((point) => {
              return (
                <circle
                  key={`point-${point.date}`}
                  r="4"
                  cx={x(point.date)}
                  cy={y(point.value)}
                  fill={
                    currentHover?.date === point.date ? graphColor : "#D9D9D9"
                  }
                  stroke={
                    currentHover?.date === point.date ? graphColor : "#ffffff"
                  }
                  strokeWidth={1}
                />
              );
            })}
          </g>
        </g>
      </svg>
      {currentHover ? (
        <div
          style={{
            transition: "all 0.2s",
            position: "absolute",
            top: y(currentHover.value) + margin.top + "px",
            left: x(currentHover.date) + margin.left + "px"
          }}
        >
          <ToolTip style={{ top: "-5px" }}>
            <div
              style={{
                fontSize: "11px",
                whiteSpace: "nowrap",
                lineHeight: "1.1rem"
              }}
            >
              <div>i18n.Datum: {formatDate(currentHover.date)}</div>
              <div>
                i18n.Rating:
                <span
                  style={{
                    background: getRatingColor(currentHover.value, ratings),
                    color: "white",
                    padding: "3px 5px",
                    borderRadius: "4px"
                  }}
                >
                  {currentHover.value}
                </span>
              </div>
            </div>
          </ToolTip>
        </div>
      ) : null}
    </Container>
  );
};

// översättning
// styling + temavariabler
// datumformatering
// throttle hover
