import React, {FC, useEffect, useState} from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import './PickerDay.scss'
import {IDate} from "./types";

const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween)

const styles = {
    termInput: "termInput",
    active: "active",
    termInputControl: "termInputControl",
    selecting: "selecting",
    picker: "picker",
    pickerCaret: "pickerCaret",
    yearOneContext: "yearOneContext",
    yearTwoContext: "yearTwoContext",
    pickerControl: "pickerControl",
    isStartMonth: "isStartMonth",
    isEndMonth: "isEndMonth",
    pickerControlInner: "pickerControlInner",
    cellWithinRange: "cellWithinRange",
    selected: "selected"
}

const {
    pickerControl,
    pickerControlInner,
} = styles

const months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"];


export interface IPickerDays {
    currentSelectionYear: any,
    date: IDate,
    hoverDate: IDate,
    onSelectDate: (value: Date | null, eventType: string) => void
    onHoverDate: (value: Date | null) => void
}

export interface IPickerDay extends IPickerDays {
    month: number
}

const PickerDay: FC<IPickerDay> = ({currentSelectionYear, onSelectDate, date, onHoverDate, hoverDate, month}) => {
    const hoverEndDateYear = dayjs(hoverDate.endDate).get('year')
    const hoverEndDateMonth = dayjs(hoverDate.endDate).get('month')

    const startDateYear = dayjs(date.startDate).get('year');
    const startDateMonth = dayjs(date.startDate).get('month');

    const endDateYear = dayjs(date.endDate).get('year');
    const endDateMonth = dayjs(date.endDate).get('month');


    const currentYear = dayjs(currentSelectionYear).get('year')
    const pickerControlClassName = [pickerControl];

    const [dayClassNames, setDayClassNames] = useState<any>({
        cellWithinRange: false,
        selected: false,
        isStartMonth: false,
        isEndMonth: false
    })


    const getSelected = (dateYear: number, dateMonth: number) => {
        return currentYear == dateYear && month == dateMonth
    }

    useEffect(() => {
        // @ts-ignore
        const isBetween = dayjs(currentSelectionYear).set('month', month).isBetween(dayjs(date.startDate), dayjs(date.endDate), 'month')
        // @ts-ignore
        const isBetweenHover = dayjs(currentSelectionYear).set('month', month).isBetween(dayjs(hoverDate.startDate), dayjs(hoverDate.endDate), 'month')

       const hovered = (isBetweenHover  ) ?false:  getSelected(hoverEndDateYear, hoverEndDateMonth) || getSelected(startDateYear, startDateMonth)

        setDayClassNames({
            ...dayClassNames,
            selected:(isBetween  ) ?false: getSelected(startDateYear, startDateMonth) || getSelected(endDateYear, endDateMonth),
            hovered:  hovered ,
            isStartMonth: getSelected(startDateYear, startDateMonth),
            isEndMonth: getSelected(endDateYear, endDateMonth),
            cellWithinRange: !isBetweenHover ? isBetween : isBetweenHover
        })


    }, [date, currentSelectionYear, hoverDate])



    return (
        <div className={classNames('day', {
            ...dayClassNames,
        })}>
            <div
                onClick={() => onSelectDate(dayjs(currentSelectionYear).set('month', month).toDate(), "click")}
                onMouseEnter={() => onHoverDate(dayjs(currentSelectionYear).set('month', month).toDate())}
                className={classNames(pickerControlClassName)}
            >
                <div className={pickerControlInner}>
                    {months[month]}

                </div>
            </div>
        </div>
    )
}

const PickerDays: FC<IPickerDays> = ({
                                         date,
                                         hoverDate,
                                         onSelectDate,
                                         onHoverDate,
                                         currentSelectionYear
                                     }) => {


    return (

        <div className={'days-wrap'}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => <PickerDay
                date={date}
                currentSelectionYear={currentSelectionYear}
                onHoverDate={onHoverDate}
                onSelectDate={onSelectDate}
                hoverDate={hoverDate}
                month={month}/>)}
        </div>

    )
}

export default PickerDays
