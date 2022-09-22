import {useEffect, useState} from "react";
import {EDatePickerType, IDate} from "../types";
import {getIsBetween, toStartOfYear} from "../utils";
import dayjs from "dayjs";

interface IDateActiveClasses {
    cellWithinRange: boolean,
    selected: boolean,
    isStartSelected: boolean,
    isEndSelected: boolean
}

export interface IUseActiveDateClasses {
    date: IDate
    currentDate: Date,
    currentSelectionYear: Date,
    type: EDatePickerType
}


const getIsSelectedDate = (date: Date, currentDate: Date, type: EDatePickerType) => {
    switch (type) {
        case EDatePickerType.Months:
            return dayjs(dayjs(date).startOf('month').toDate()).isSame(dayjs(currentDate).startOf('month').toDate())
        case EDatePickerType.Quarters:
            const dateQuarter = dayjs(date).quarter(dayjs(date).quarter()).startOf('quarter').toDate()
            const currentDateQuarter = dayjs(currentDate).quarter(dayjs(currentDate).quarter()).startOf('quarter').toDate()
            return dayjs(dateQuarter).isSame(currentDateQuarter)
        case EDatePickerType.Seasons:
            return dayjs(currentDate).isSame(toStartOfYear(date))
    }
}


const UseActiveDateClasses = ({
                                  date,
                                  currentDate,
                                  currentSelectionYear,
                                  type
                              }: IUseActiveDateClasses) => {

    const [activeDateClasses, setClasses] = useState<IDateActiveClasses>({
        cellWithinRange: false,
        selected: false,
        isStartSelected: false,
        isEndSelected: false
    })
    const {startDate, endDate} = date;


    useEffect(() => {
        const isBetween = getIsBetween(currentDate, startDate, endDate, type)
        const isSelected = getIsSelectedDate(startDate!, currentDate, type)
            || getIsSelectedDate(endDate!, currentDate, type)

        setClasses({
            ...activeDateClasses,
            selected: isSelected,
            isStartSelected: getIsSelectedDate(startDate!, currentDate, type),
            isEndSelected: getIsSelectedDate(endDate!, currentDate, type),
            cellWithinRange: isBetween
        })

    }, [date, currentSelectionYear])


    return {activeDateClasses}
}

export default UseActiveDateClasses
