import React, {FC, useState} from "react";
import dayjs from "dayjs";
import './PickerDay.scss'
import {EDatePickerType, IDate, IIsSelecting} from "./types";
import PickerHeader from "./PickerHeader";
import PickerMonths from "./PickerMonths";
import PickerQuarters from "./PickerQuarters";
import PickerSeasons from "./PickerSeasons";

export interface IPickerMarkup {
    selectingRange: IIsSelecting,
    openPickerType:EDatePickerType,
    date: IDate,
    hoverDate: IDate,
    onSelectDate: (value: Date | null) => void
    onHoverDate: (value: Date | null) => void
    incrementYear?: number,
    minDate: Date
    maxDate: Date
}

const PickerMarkup: FC<IPickerMarkup> = ({
                                             selectingRange,
                                             date,
                                             hoverDate,
                                             onSelectDate,
                                             onHoverDate,
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
                            hoverDate={hoverDate}
                            onSelectDate={onSelectDate}
                            date={date}
                            onHoverDate={onHoverDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    )}
                    {openPickerType === EDatePickerType.Quarters && (
                        <PickerQuarters
                            currentSelectionYear={currentSelectionYear}
                            hoverDate={hoverDate}
                            onSelectDate={onSelectDate}
                            date={date}
                            onHoverDate={onHoverDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    )}

                    {openPickerType === EDatePickerType.Seasons && (
                        <PickerSeasons
                            currentSelectionYear={currentSelectionYear}
                            hoverDate={hoverDate}
                            onSelectDate={onSelectDate}
                            date={date}
                            onHoverDate={onHoverDate}
                            minDate={minDate}
                            maxDate={maxDate}
                            selectingRange={selectingRange}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default PickerMarkup
