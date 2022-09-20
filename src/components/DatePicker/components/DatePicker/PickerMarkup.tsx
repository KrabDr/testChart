import React, {FC, useState} from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import './PickerDay.scss'
import {IDate, IIsSelecting} from "./types";
import PickerDays from "./PickerDays";

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
    picker,
    pickerCaret,
    yearOneContext,
} = styles



export interface IPickerMarkup {
    selectingRange: IIsSelecting,
    date: IDate,
    hoverDate: IDate,
    onSelectDate: (value: Date | null, eventType: string) => void
    onHoverDate: (value: Date | null) => void
    incrementYear?: number
}

const PickerMarkup: FC<IPickerMarkup> = ({
                                             selectingRange,
                                             date,
                                             hoverDate,
                                             onSelectDate,
                                             onHoverDate,
                                             incrementYear = 0
                                         }) => {
    const [currentSelectionYear, setCurrentSelectionYear] = useState(dayjs(new Date()).startOf('month').startOf('year').add(incrementYear, 'year').toDate())


    const onHandleChangeYear = (count: number) => {
        setCurrentSelectionYear(dayjs(currentSelectionYear).add(count, 'year').toDate())
    }


    return selectingRange.isStartDateSelected || selectingRange.isEndDateSelected ? (
        <div className={picker}>
            <div style={{left: selectingRange.isEndDateSelected ? "66px" : "190px"}}
                 className={pickerCaret}></div>
            <div className={yearOneContext}>
                <div style={{display: 'flex'}}>
                    <div onClick={() => onHandleChangeYear(-1)}>
                        <svg width={15} height={15} viewBox="0 0 51.4 51.4">
                            <path
                                d="M31.4 45.8L15.3 29.7h36.1v-8H15.3L31.4 5.6 25.7 0 0 25.7l25.7 25.7"/>
                        </svg>
                    </div>
                    <div>{dayjs(currentSelectionYear).get('year')}</div>
                    <div onClick={() => onHandleChangeYear(1)}>
                        <svg width={15} height={15} viewBox="0 0 51.4 51.4">
                            <path d="M20 5.6l16.1 16.1H0v8h36.1L20 45.8l5.7 5.6 25.7-25.7L25.7 0"/>
                        </svg>
                    </div>
                </div>

                <div>
                    <PickerDays
                        currentSelectionYear={currentSelectionYear}
                        hoverDate={hoverDate}
                        onSelectDate={onSelectDate}
                        date={date}
                        onHoverDate={onHoverDate}/>
                </div>
            </div>
        </div>
    ) : null
}

export default PickerMarkup
