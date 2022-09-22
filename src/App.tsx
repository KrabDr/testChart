import "./styles.css";
import {ScoreChart} from "./ScoreChart";
import {EExternalData, externalData} from "./data";
import Legend from "./Legend";
import React, {useState} from "react";
import {RDatePicker} from "./components/DatePicker/components/ReactDatePicker/RDatePicker";
import {DatePicker} from "./components/DatePicker/components/DatePicker/DatePicker";
import dayjs from "dayjs";


export interface ILegend {
    isActive: boolean
    color: string,
    name: 'Base' | 'Peak' | 'ExtendedPeak',
    title: EExternalData
}

export default function App() {
    const [legends, setLegends] = useState<any>(externalData.reduce((acc, value) => {
        return {
            ...acc, [value.name]: {
                isActive: true,
                name: value.name,
                title: EExternalData[value.name],
                color: value.color
            }
        }
    }, {}));


    const onToggleLegend = (name: any) => {
        setLegends({...legends, [name]: {...legends[name], isActive: !legends[name].isActive}})
    }

    return (
        <div className="App">
            <h1>Chart POC</h1>
            <DatePicker defaultStartValue={new Date()} defaultEndValue={dayjs().add(3,'month').endOf('month').toDate()} />

            <div className="datePicker">

                <RDatePicker/>
            </div>
            <div
                className={'chartWrapper'}
            >
                <div className="chart">
                    <ScoreChart
                        margin={{top: 8, left: 30, right: 10, bottom: 20}}
                        data={externalData.filter((item) => {
                            return legends[item.name].isActive === true
                        })}
                        axisText={{
                            left: 'Power prices (£-MWh)',
                            bottom: "Month"
                        }}
                    />
                </div>
                <div className="legend">
                    <Legend data={legends} toggleActiveState={onToggleLegend}/>
                </div>
            </div>
        </div>
    );
}
