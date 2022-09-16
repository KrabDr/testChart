import "./styles.css";
import { RatingChart } from "./RatingChart";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div
        style={{
          width: "700px",
          height: "400px"
        }}
      >
        <RatingChart
          margin={{ top: 20, left: 30, right: 10, bottom: 20 }}
          data={[
            { date: new Date("2021-06-01"), value: 15 },
            { date: new Date("2021-06-02"), value: 18 },
            { date: new Date("2021-06-03"), value: 15 },
            { date: new Date("2021-06-04"), value: 40 },
            { date: new Date("2021-06-05"), value: 99 }
          ]}
          ratings={[
            { value: 0, color: "#217263" },
            { value: 36, color: "#F7B02D" },
            { value: 70, color: "#D96178" }
          ]}
        />
      </div>
    </div>
  );
}

/*
import { useRef } from "react";
import { ToolTip } from "./ToolTip";
  const ref = useRef<HTMLDivElement>(null);
<div>
        <ToolTip
          ref={ref}
          style={{
            top: `${window.innerHeight / 2}px`,
            left: `${window.innerWidth / 2}px`
          }}
        >
          <div style={{ fontSize: "11px" }}>
            <div style={{ marginBottom: "0.5rem" }}>Datum: 2021-06-30</div>
            <div>
              Rating:{" "}
              <span
                style={{
                  background: "#D96178",
                  color: "white",
                  padding: "3px 5px",
                  borderRadius: "4px"
                }}
              >
                88
              </span>
            </div>
          </div>
        </ToolTip>
      </div>
      */
