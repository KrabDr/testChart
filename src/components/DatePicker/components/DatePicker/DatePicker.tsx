import React, {FC, useEffect, useState} from "react";
import PickerMarkup from "./PickerMarkup";
import dayjs from "dayjs";
import {EDatePickerType, IDate, IIsSelecting} from "./types";
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)

import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import {quarters, seasonMonths, seasons} from "./data";
require('dayjs/plugin/quarterOfYear')
dayjs.extend(quarterOfYear)


export interface IDatePicker {
    defaultStartValue?: Date | null
    defaultEndValue?: Date | null
    minDate?: Date
    maxDate?: Date
    pickerType?: EDatePickerType
}

const formatToCurrentType = (type: EDatePickerType, date: Date, direction: 'end' | 'start') => {
    switch (type) {
        case EDatePickerType.Months:
            if (direction === 'end') {
                return dayjs(date).endOf(type).toDate()
            }
            return dayjs(date).startOf(type).toDate()
        case EDatePickerType.Quarters:
            if (direction === 'end') {
                return dayjs(date).endOf(type).toDate()
            }
            return dayjs(date).startOf(type).toDate()
        case EDatePickerType.Seasons:
            switch (direction) {
                case 'end':
                    if (dayjs(date).get('month') === 9) {
                        return dayjs(date).add(1,'year').set('month', 2).endOf('month').toDate()
                    }
                    return dayjs(date).set('month', 8).endOf('month').toDate()
                case "start":
                    return dayjs(date).startOf('month').toDate()
            }


    }
}

const printCorrectFormat = (type: EDatePickerType, date: Date | null) => {
    if (!dayjs(date).isValid()) return 'Choose Date'
    switch (type) {
        case EDatePickerType.Months:
            return dayjs(date).format('YYYY MMM')
        case EDatePickerType.Quarters:
            return `${quarters[dayjs(date).quarter() -1 ]} ${dayjs(date).format('YYYY')}`
        case EDatePickerType.Seasons:
            if(seasonMonths.winter.some((s)=>s === dayjs(date).get('month'))){
                return `Winter ${dayjs(date).get('year')}  `
            }
            if(seasonMonths.summer.some((s)=>s === dayjs(date).get('month'))){
                return `Summer ${dayjs(date).get('year')}  `
            }
            return 'Choose Date'
    }
}


export const DatePicker: FC<IDatePicker> = ({
                                                defaultStartValue = null,
                                                defaultEndValue = null,
                                                pickerType = EDatePickerType.Months,
                                                minDate = dayjs().startOf('month').toDate(),
                                                maxDate = dayjs().add(5, 'year').endOf('year').endOf('month').toDate(),
                                            }) => {
    const [openPickerType, setOpenPickerType] = useState<EDatePickerType>(pickerType)

    const [isSelectingRange, setIsSelectingRange] = useState<IIsSelecting>({
        isStartDateSelected: false,
        isEndDateSelected: false,
    })
    const isOpenPicker = isSelectingRange.isStartDateSelected || isSelectingRange.isEndDateSelected;

    const [date, setDate] = useState<IDate>({
        startDate: defaultStartValue,
        endDate: defaultEndValue
    })
    const [hoverDate, setHoverDate] = useState<IDate>({
        startDate: null,
        endDate: null
    })

    const onSelectDate = (value: Date | null) => {
        if (isSelectingRange.isStartDateSelected) {
            setDate({
                startDate: value,
                endDate: null
            })
            setIsSelectingRange({
                isStartDateSelected: false,
                isEndDateSelected: true
            })
        } else {
            setDate((prevValue) => {
                return ({
                    startDate: dayjs(prevValue.startDate).isBefore(value) ? prevValue.startDate : value,
                    endDate: dayjs(prevValue.startDate).isBefore(value) ? formatToCurrentType(openPickerType, value!, 'end') : formatToCurrentType(openPickerType, prevValue.startDate!, 'end')
                })
            })
            setIsSelectingRange({
                isStartDateSelected: false,
                isEndDateSelected: false
            })
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
                    endDate: formatToCurrentType(openPickerType, value!, 'end')
                })
            })
        }

    };


    const changePickerType = (type: EDatePickerType) => {
        setIsSelectingRange({
            isStartDateSelected: true,
            isEndDateSelected: false
        })
        setDate({
            startDate: null,
            endDate: null
        })
        setOpenPickerType(type)
    }

    const changeToDefault = () => {
        setDate({
            startDate: defaultStartValue,
            endDate: defaultEndValue
        })
        setIsSelectingRange({
            isStartDateSelected: true,
            isEndDateSelected: false
        })
    };

    // useEffect(() => {
    //
    // }, [openPickerType]);


    return (
        <div>
            <div
                className="picker-button"
                onClick={() => setIsSelectingRange({
                    isStartDateSelected: true,
                    isEndDateSelected: false
                })}>
                <div className="picker-button-start">
                    {printCorrectFormat(openPickerType, date.startDate)}
                </div>
                <span>-</span>
                <div  className="picker-button-end">
                    {printCorrectFormat(openPickerType, date.endDate)}
                </div>
            </div>

            {isOpenPicker && (
                <div className="pickerWrapper">
                    <div className="pickerNavigation">
                        <ul>
                            <li>
                                <button type='button'
                                        onClick={() => changePickerType(EDatePickerType.Months)}>{EDatePickerType.Months}</button>
                            </li>
                            <li>
                                <button type='button'
                                        onClick={() => changePickerType(EDatePickerType.Quarters)}>{EDatePickerType.Quarters}</button>
                            </li>
                            <li>
                                <button type='button'
                                        onClick={() => changePickerType(EDatePickerType.Seasons)}>{EDatePickerType.Seasons}</button>
                            </li>
                            <li>
                                <button type='button'
                                        onClick={() => changeToDefault()}>Reset to default</button>
                            </li>
                        </ul>
                    </div>
                    <div className="pickers">

                        <PickerMarkup
                            openPickerType={openPickerType}
                            selectingRange={isSelectingRange}
                            date={date}
                            hoverDate={hoverDate}
                            onSelectDate={onSelectDate}
                            onHoverDate={onHoverDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                        <PickerMarkup
                            openPickerType={openPickerType}
                            incrementYear={1}
                            selectingRange={isSelectingRange}
                            date={date}
                            hoverDate={hoverDate}
                            onSelectDate={onSelectDate}
                            onHoverDate={onHoverDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                </div>
            )}
        </div>
    )

}

export default DatePicker
