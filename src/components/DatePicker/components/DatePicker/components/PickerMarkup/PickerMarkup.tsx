import React, {FC, useState} from "react";
import dayjs from "dayjs";
import '../../PickerDay.scss'
import {EDatePickerPeriod, IDate} from "../../types";
import PickerHeader from "../PickerHeader/PickerHeader";
import PickerMonths from "../PickerMonths/PickerMonths";
import PickerQuarters from "../PickerQuarters/PickerQuarters";
import PickerSeasons from "../PickerSeasons/PickerSeasons";

import styles from './PickerMarkup.module.scss'

export interface IPickerMarkup {
    openPickerType: EDatePickerPeriod,
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
        <div className={styles.picker}>
            <PickerHeader
                currentSelectionYear={currentSelectionYear}
                onHandleChangeYear={onHandleChangeYear}
                minDate={minDate}
                maxDate={maxDate}
            />

            <div>
                {openPickerType === EDatePickerPeriod.Months && (
                    <PickerMonths
                        currentSelectionYear={currentSelectionYear}
                        onSelectDate={onSelectDate}
                        date={date}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                )}
                {openPickerType === EDatePickerPeriod.Quarters && (
                    <PickerQuarters
                        currentSelectionYear={currentSelectionYear}
                        onSelectDate={onSelectDate}
                        date={date}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                )}

                {openPickerType === EDatePickerPeriod.Seasons && (
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
    )
}

export default PickerMarkup
