import React, {FC, useState} from "react";
import './custom.scss'
import PickerMarkup from "./PickerMarkup";
import dayjs from "dayjs";
import {IDate, IIsSelecting} from "./types";



export interface IDatePicker {
    defaultStartValue?: Date | null
    defaultEndValue?: Date | null
}



export const DatePicker: FC<IDatePicker> = ({defaultStartValue= null, defaultEndValue= null}) => {
    const currentDate = new Date();

    const [isSelectingRange, setIsSelectingRange] = useState<IIsSelecting>({
        isStartDateSelected: false,
        isEndDateSelected: false,
    })

    const [date, setDate] = useState<IDate>({
        startDate: defaultStartValue,
        endDate: defaultEndValue
    })
    const [hoverDate, setHoverDate] = useState<IDate>({
        startDate: null,
        endDate: null
    })


    const onSelectDate = (value: Date | null, eventType: string) => {
        if (isSelectingRange.isStartDateSelected) {
            if (eventType == "click") {
                setDate({
                    startDate: value,
                    endDate: null
                })
                setIsSelectingRange({
                    isStartDateSelected: false,
                    isEndDateSelected: true
                })
            }
        } else {
            if (eventType == "click") {
                setDate((prevValue) => {
                    return ({
                        startDate: prevValue.startDate,
                        endDate: value
                    })
                })
                setIsSelectingRange({
                    isStartDateSelected: true,
                    isEndDateSelected: false
                })
            }
        }

    }

    const onHoverDate = (value: Date | null) => {

        if (isSelectingRange.isStartDateSelected) {
            setHoverDate({
                startDate: value,
                endDate: null
            })
        } else {
            setHoverDate((prevValue) => {
                return ({
                    startDate: prevValue.startDate,
                    endDate: value
                })
            })
        }

    };

    return (
        <div>
            <div
                onClick={() => setIsSelectingRange({
                    isStartDateSelected: true,
                    isEndDateSelected: false
                })}>
                <div>
                    {dayjs(date.startDate).format('YYYY MMM')}
                </div>
                <div>
                    {dayjs(date.endDate).format('YYYY MMM')}
                </div>
            </div>

            <PickerMarkup
                selectingRange={isSelectingRange}
                date={date}
                hoverDate={hoverDate}
                onSelectDate={onSelectDate}
                onHoverDate={onHoverDate}
            />
            <PickerMarkup
                incrementYear={1}
                selectingRange={isSelectingRange}
                date={date}
                hoverDate={hoverDate}
                onSelectDate={onSelectDate}
                onHoverDate={onHoverDate}
            />
        </div>
    )

}

export default DatePicker
