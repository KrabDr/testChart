import React, {FC, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";
import './PickerDay.scss'
import {IDate} from "./types";
import {quarters} from "./data";
import {range} from "../../../../utilities/utilities";


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


export interface IPickerQuarters {
    currentSelectionYear: any,
    date: IDate,
    hoverDate: IDate,
    onSelectDate: (value: Date | null) => void
    onHoverDate: (value: Date | null) => void
    minDate: Date | null
    maxDate: Date | null
}

export interface IPickerQuarter extends IPickerQuarters {
    quarter: number
}

const getIsBetweenQuarter = (quarter: Dayjs, startQuarter: Dayjs, endQuarter: Dayjs) => {
    return quarter.toDate() > startQuarter.toDate() && quarter.toDate() < endQuarter.toDate()
}

const PickerQuarter: FC<IPickerQuarter> = ({
                                               currentSelectionYear,
                                               onSelectDate,
                                               date,
                                               onHoverDate,
                                               hoverDate,
                                               quarter,
                                               minDate,
                                               maxDate
                                           }) => {
    const isDisabled = dayjs(currentSelectionYear).quarter(quarter + 1).isBefore(minDate, 'months') && dayjs(currentSelectionYear).quarter(quarter + 1).isBefore(maxDate, 'month')

    const hoverEndDateYear = dayjs(hoverDate.endDate).get('year')
    const hoverEndDateQuarter = dayjs(hoverDate.endDate).quarter()

    const startDateYear = dayjs(date.startDate).get('year');
    const startDateQuarter = dayjs(date.startDate).quarter();

    const endDateYear = dayjs(date.endDate).get('year');
    const endDateQuarter = dayjs(date.endDate).quarter();


    const currentYear = dayjs(currentSelectionYear).get('year')
    const pickerControlClassName = [pickerControl];

    const [dayClassNames, setDayClassNames] = useState<any>({
        cellWithinRange: false,
        selected: false,
        isStartMonth: false,
        isEndMonth: false
    })


    const getSelected = (dateYear: number, dateQuarter: number) => {
        return currentYear == dateYear && quarter == dateQuarter - 1
    }


    useEffect(() => {
        const isBetween = getIsBetweenQuarter(dayjs(currentSelectionYear).quarter(quarter + 1), dayjs(date.startDate), dayjs(date.endDate));
        setDayClassNames({
            ...dayClassNames,
            selected: getSelected(startDateYear, startDateQuarter) || getSelected(endDateYear, endDateQuarter),
            isStartMonth: getSelected(startDateYear, startDateQuarter),
            isEndMonth: getSelected(endDateYear, endDateQuarter),
            cellWithinRange: isBetween
        })


    }, [date, currentSelectionYear, hoverDate])

    return (
        <button type={"button"}
                disabled={isDisabled}
                onClick={() => onSelectDate(dayjs(dayjs(currentSelectionYear).quarter(quarter + 1)).toDate())}
            // onMouseEnter={() => onHoverDate(dayjs(currentSelectionYear).quarter(quarter).toDate())}
                className={classNames('quarter', {
                    ...dayClassNames,
                })}
        >
            <div className={pickerControlInner}>
                {quarters[quarter]}
            </div>
        </button>
    )
}

const PickerQuarters: FC<IPickerQuarters> = ({
                                                 date,
                                                 hoverDate,
                                                 onSelectDate,
                                                 onHoverDate,
                                                 currentSelectionYear,
                                                 minDate, maxDate
                                             }) => {
    return (

        <div className={'quarter-wrap'}>
            {range(0,3).map((quarter) => <PickerQuarter
                date={date}
                currentSelectionYear={currentSelectionYear}
                onHoverDate={onHoverDate}
                onSelectDate={onSelectDate}
                hoverDate={hoverDate}
                quarter={quarter}
                minDate={minDate}
                maxDate={maxDate}
            />)}
        </div>

    )
}

export default PickerQuarters
