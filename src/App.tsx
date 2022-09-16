import "./styles.css";
import { ScoreChart } from "./ScoreChart";
import {data1} from "./data";

export default function App() {
  return (
    <div className="App">
      <h1>Chart POC</h1>

      <div
        style={{
          width: "700px",
          height: "400px"
        }}
      >
        <ScoreChart
          margin={{ top: 20, left: 30, right: 10, bottom: 20 }}
          data={data1}
        />
      </div>
    </div>
  );
}
