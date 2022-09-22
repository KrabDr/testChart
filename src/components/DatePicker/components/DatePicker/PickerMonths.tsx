import React, {FC, useEffect, useState} from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import './PickerDay.scss'
import {IDate} from "./types";
import {months} from "./data";
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

export interface IPickerMonths {
    currentSelectionYear: any,
    date: IDate,
    hoverDate: IDate,
    onSelectDate: (value: Date | null) => void
    onHoverDate: (value: Date | null) => void,
    minDate: Date | null
    maxDate: Date | null
}

export interface IPickerMonth extends IPickerMonths {
    month: number
}

const PickerMonth: FC<IPickerMonth> = ({
                                           currentSelectionYear,
                                           onSelectDate,
                                           date,
                                           onHoverDate,
                                           hoverDate,
                                           month,
                                           minDate,
                                           maxDate
                                       }) => {
    // const hoverEndDateYear = dayjs(hoverDate.endDate).get('year')
    // const hoverEndDateMonth = dayjs(hoverDate.endDate).get('month')
    const isDisabled = dayjs(currentSelectionYear).set('month', month).isBefore(minDate, 'months') && dayjs(currentSelectionYear).set('month', month).isBefore(maxDate, 'month')

    const startDateYear = dayjs(date.startDate).get('year');
    const startDateMonth = dayjs(date.startDate).get('month');

    const endDateYear = dayjs(date.endDate).get('year');
    const endDateMonth = dayjs(date.endDate).get('month');


    const currentYear = dayjs(currentSelectionYear).get('year')

    const [monthClassNames, setMonthClassNames] = useState<any>({
        cellWithinRange: false,
        selected: false,
        isStartMonth: false,
        isEndMonth: false
    })


    const getSelected = (dateYear: number, dateMonth: number) => {
        return currentYear == dateYear && month == dateMonth
    }

    useEffect(() => {
        const isBetween = dayjs(currentSelectionYear).set('month', month).isBetween(dayjs(date.startDate), dayjs(date.endDate), 'month')
        // const isBetweenHover = dayjs(currentSelectionYear).set('month', month).isBetween(dayjs(hoverDate.startDate), dayjs(hoverDate.endDate), 'month')
        //
        // const hovered = (isBetweenHover) ? false : getSelected(hoverEndDateYear, hoverEndDateMonth) || getSelected(startDateYear, startDateMonth)

        setMonthClassNames({
            ...monthClassNames,
            selected: (isBetween) ? false : getSelected(startDateYear, startDateMonth) || getSelected(endDateYear, endDateMonth),
            // hovered: hovered,
            isStartMonth: getSelected(startDateYear, startDateMonth),
            isEndMonth: getSelected(endDateYear, endDateMonth),
            cellWithinRange: isBetween
        })


    }, [date, currentSelectionYear, hoverDate])


    return (

        <button
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectDate(dayjs(currentSelectionYear).set('month', month).toDate())}
            // onMouseEnter={() => onHoverDate(dayjs(currentSelectionYear).set('month', month).toDate())}
            className={classNames('day', {
                ...monthClassNames,
            })}
        >
            <div className={pickerControlInner}>
                {months[month]}
            </div>
        </button>
    )
}

const PickerMonths: FC<IPickerMonths> = ({
                                             date,
                                             hoverDate,
                                             onSelectDate,
                                             onHoverDate,
                                             currentSelectionYear,
                                             maxDate,
                                             minDate
                                         }) => {
    return (

        <div className={'days-wrap'}>
            {range(0, 11).map((month) => <PickerMonth
                date={date}
                currentSelectionYear={currentSelectionYear}
                onHoverDate={onHoverDate}
                onSelectDate={onSelectDate}
                hoverDate={hoverDate}
                month={month}
                maxDate={maxDate}
                minDate={minDate}
            />)}
        </div>

    )
}

export default PickerMonths
