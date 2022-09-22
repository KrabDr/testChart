import React, {useEffect, useRef, useState} from "react";

import "react-datepicker/dist/react-datepicker.css";
import {useOnClickOutside} from "../../../../hooks/UseOnClickOutside";
import {range} from "../../../../utilities/utilities";
import dayjs from "dayjs";
import MonthPicker from "./MonthPicker";
import SeasonPicker from "./SeasonPicker";
import YearsPicker from "./YearsPicker";

const localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData)

export enum EOpenStates {
    Months = 'Months',
    Years = "Years",
    Seasons = 'Seasons'
}

export const RDatePicker = () => {
    const [date, setDate] = useState<{
        startDate?: Date | null
        endDate?: Date | null
    }>({})


    const yearList = range(dayjs().get('year'), dayjs().add(11, 'year').get('year'));

    const ref = useRef<any>();
    const [isOpen, setIsOpen] = useState<EOpenStates | false>(false)


    const openDatePicker = (type: EOpenStates | false) => {
        setIsOpen(type)
    }

    useOnClickOutside(ref, () => openDatePicker(false))


    // TODO need to remove this fix when this bug will be resolver
    // https://github.com/Hacker0x01/react-datepicker/issues/3450
    useEffect(() => {
        if (isOpen !== false && !date.startDate  && !date.endDate) {
            setDate({
                startDate: null,
                endDate: null
            })
        }
    }, [isOpen]);


    return (

        <> {isOpen !== false && (
            <div>
                <ul>
                    <li>
                        <button type='button' onClick={() => openDatePicker(EOpenStates.Months)}>Month</button>
                    </li>
                    <li>
                        <button type='button' onClick={() => openDatePicker(EOpenStates.Seasons)}>Seasons</button>
                    </li>
                    <li>
                        <button type='button' onClick={() => openDatePicker(EOpenStates.Years)}>Years</button>
                    </li>
                </ul>
                <>
                    {isOpen=== EOpenStates.Months && (

                    <div className="div" style={{display:'flex'}}>
                        <MonthPicker
                            value={date.startDate}
                            minDate={dayjs(new Date()).startOf('year').toDate()}
                            maxDate={new Date(2031,0)}
                            date={date}
                            onChange={(value: any) => setDate({startDate:value[0], endDate: value[1]})}
                            customHeaderCount={0}
                        />
                        <MonthPicker
                            value={date.endDate}
                            minDate={dayjs(new Date()).startOf('year').toDate()}
                            maxDate={new Date(2031,0)}
                            date={date}
                            onChange={(value: any) => setDate({startDate:value[0], endDate: value[1]})}
                            customHeaderCount={1}

                        />
                    </div>
                    )}
                    {isOpen=== EOpenStates.Seasons && (

                    <div className="div" style={{display:'flex'}}>
                        <SeasonPicker
                            value={date.startDate}
                            minDate={dayjs(new Date()).startOf('year').toDate()}
                            maxDate={new Date(2031,0)}
                            date={date}
                            onChange={(value: any) => setDate({startDate:value[0], endDate: value[1]})}
                            // onChange={(value: Date) => setDate({startDate:value, endDate: date.endDate})}
                        />
                        <SeasonPicker
                            value={date.endDate}
                            minDate={dayjs(new Date()).startOf('year').toDate()}
                            maxDate={new Date(2031,0)}
                            date={date}
                            // onChange={(value: Date) => setDate({startDate:date.startDate, endDate: value})}
                            onChange={(value: any) => setDate({startDate:value[0], endDate: value[1]})}

                        />
                    </div>
                    )}
                    {isOpen=== EOpenStates.Years && (

                    <div className="div" style={{display:'flex'}}>
                        <YearsPicker
                            value={date.startDate}
                            minDate={dayjs(new Date()).startOf('year').toDate()}
                            maxDate={new Date(2031,0)}
                            date={date}
                            onChange={(value: Date[]) => {
                                setDate({startDate: value[0], endDate: value[1]});
                            }}
                        />
                    </div>
                    )}
                </>
            </div>
        )}
        </>
    );
};
