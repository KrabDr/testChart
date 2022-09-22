import React, {FC, useState} from "react";
import dayjs from "dayjs";
import '../../PickerDay.scss'
import {EDatePickerType, IDate} from "../../types";
import PickerHeader from "../PickerHeader/PickerHeader";
import PickerMonths from "../PickerMonths/PickerMonths";
import PickerQuarters from "../PickerQuarters/PickerQuarters";
import PickerSeasons from "../PickerSeasons/PickerSeasons";

export interface IPickerMarkup {
    openPickerType:EDatePickerType,
    date: IDate,
    onSelectDate: (value: Date | null) => void
    incrementYear?: number,
    minDate: Date
    maxDate: Date
}

const PickerMarkup: FC<IPickerMarkup> = ({
                                             date,
                                             onSelectDate,
                                             incrementYear = 0,
                                             minDate,
                                             maxDate,
                                             openPickerType
                                         }) => {
    const [currentSelectionYear, setCurrentSelectionYear] = useState(dayjs(new Date()).startOf('month').startOf('year').add(incrementYear, 'year').toDate())


    const onHandleChangeYear = (year: number) => {
        setCurrentSelectionYear(dayjs(currentSelectionYear).set('year', year).toDate())
    }


    return (
        <div className={"picker"}>
            <div >
                <PickerHeader
                    currentSelectionYear={currentSelectionYear}
                    onHandleChangeYear={onHandleChangeYear}
                    minDate={minDate}
                    maxDate={maxDate}
                />

                <div>
                    {openPickerType === EDatePickerType.Months && (
                        <PickerMonths
                            currentSelectionYear={currentSelectionYear}
                            onSelectDate={onSelectDate}
                            date={date}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    )}
                    {openPickerType === EDatePickerType.Quarters && (
                        <PickerQuarters
                            currentSelectionYear={currentSelectionYear}
                            onSelectDate={onSelectDate}
                            date={date}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    )}

                    {openPickerType === EDatePickerType.Seasons && (
                        <PickerSeasons
                            currentSelectionYear={currentSelectionYear}
                            onSelectDate={onSelectDate}
                            date={date}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default PickerMarkup
