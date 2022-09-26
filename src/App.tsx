import "./styles.css";
import {ScoreChart} from "./components/ScoreChart";
import {EExternalData, externalData} from "./data";
import Legend, {ILegend} from "./components/Legend/Legend";
import React, {useState} from "react";
import {DatePicker} from "./components/DatePicker/components/DatePicker/DatePicker";
import dayjs from "dayjs";
import {ETabsMode, Tabs, TabWrapper} from "./components/Tabs";
import Card from "./components/Card/Card";

export type ILegendName = 'Base' | 'Peak' | 'ExtendedPeak'

interface ILegendsData {
    name:string,
    color:string,
}

const convertToLegends = <E extends any,T extends ILegendsData[] = ILegendsData[]>(data:T,titles: E | any)=>{
   return data.reduce<Record<string, any>>((acc, value) => {
       return {
           ...acc, [value.name]: {
               isActive: true,
               name: value.name,
               title: titles[value.name],
               color: value.color
           }
       }
   }, {})
}

export default function App() {
    const [legends, setLegends] = useState<Record<ILegendName, ILegend<ILegendName>>>(convertToLegends(externalData,EExternalData))

    const onToggleLegend = (name: ILegendName) => {
        setLegends({...legends, [name]: {...legends[name], isActive: !legends[name].isActive}})
    }

    return (
        <div className="App">

            <Tabs title="External market view" mode={ETabsMode.Primary}>
                <TabWrapper tabName={'Power'} >
                    <Card>
                        <DatePicker defaultStartValue={new Date()} defaultEndValue={dayjs().add(3,'month').endOf('month').toDate()} />
                        <div
                            className={'chartWrapper'}
                        >
                            <div className="chart">
                                <ScoreChart
                                    margin={{top: 8, left: 30, right: 10, bottom: 20}}
                                    data={externalData.filter((item) => legends[item.name].isActive)}
                                    axisText={{
                                        left: 'Power prices (£-MWh)',
                                        bottom: "Month"
                                    }}
                                />
                            </div>
                            <div className="legend">
                                <Legend<ILegendName> data={legends} toggleActiveState={onToggleLegend}/>
                            </div>
                        </div>
                    </Card>
                </TabWrapper>
                <TabWrapper tabName={'Biomass'} >
                  <Card>
                      <DatePicker defaultStartValue={new Date()} defaultEndValue={dayjs().add(3,'month').endOf('month').toDate()} />
                      <div
                          className={'chartWrapper'}
                      >
                          <div className="chart">
                              <ScoreChart
                                  margin={{top: 8, left: 30, right: 10, bottom: 20}}
                                  data={externalData.filter((item) => legends[item.name].isActive)}
                                  axisText={{
                                      left: 'Power prices (£-MWh)',
                                      bottom: "Month"
                                  }}
                              />
                          </div>
                          <div className="legend">
                              <Legend<ILegendName> data={legends} toggleActiveState={onToggleLegend}/>
                          </div>
                      </div>
                  </Card>
                </TabWrapper>
            </Tabs>



        </div>
    );
}
