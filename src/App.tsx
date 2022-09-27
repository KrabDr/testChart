import "./styles.css";
import {ScoreChart} from "./components/ScoreChart";
import {EExternalData, externalData} from "./scoreChartData";
import Legend, {ILegend} from "./components/Legend/Legend";
import React, {useState} from "react";
import {DateRangePicker} from "./components/DateRangePicker/DateRangePicker";
import dayjs from "dayjs";
import {ETabsMode, Tabs, TabWrapper} from "./components/Tabs";
import Card from "./components/Card/Card";
import {convertToLegends} from "./components/Legend/utils";

export type ILegendName = 'Base' | 'Peak' | 'ExtendedPeak'

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
                        <DateRangePicker defaultStartValue={new Date()} defaultEndValue={dayjs().add(3,'month').endOf('month').toDate()} />
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
                      <DateRangePicker defaultStartValue={new Date()} defaultEndValue={dayjs().add(3,'month').endOf('month').toDate()} />
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
