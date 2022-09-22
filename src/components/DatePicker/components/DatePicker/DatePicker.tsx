import React, {FC, useState} from "react";
import PickerMarkup from "./components/PickerMarkup/PickerMarkup";
import dayjs from "dayjs";
import {EDatePickerType, IDate, IIsSelecting} from "./types";
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import {formatToCurrentType} from "./utils";
import PickerOpenButton from "./components/PickerOpenButton/PickerOpenButton";
import PickerNavigation from "./components/PickerNavigation/PickerNavigation";


dayjs.extend(quarterOfYear)


export interface IDatePicker {
    defaultStartValue?: Date | null
    defaultEndValue?: Date | null
    minDate?: Date
    maxDate?: Date
    pickerType?: EDatePickerType
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
        }

        if (isSelectingRange.isEndDateSelected) {
            setDate((prevValue) => ({
                startDate: dayjs(prevValue.startDate).isBefore(value) ? prevValue.startDate : value,
                endDate: dayjs(prevValue.startDate).isBefore(value) ? formatToCurrentType(openPickerType, value!, 'end') : formatToCurrentType(openPickerType, prevValue.startDate!, 'end')
            }))
            setIsSelectingRange({
                isStartDateSelected: true,
                isEndDateSelected: false
            })
        }

    }

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
        setOpenPickerType(EDatePickerType.Months)
        setIsSelectingRange({
            isStartDateSelected: true,
            isEndDateSelected: false
        })
    };


    const toggleOpenState = (state: boolean) => {
        setIsSelectingRange(state ? {
            isStartDateSelected: true,
            isEndDateSelected: false
        } : {
            isStartDateSelected: false,
            isEndDateSelected: false
        })
    }

    return (
        <>
            <PickerOpenButton date={date} type={openPickerType} onOpen={toggleOpenState}/>

            {isOpenPicker && (
                <div className="pickerWrapper">
                    <div className="pickerAside">
                        <PickerNavigation actions={[
                            {action: () => changePickerType(EDatePickerType.Months), title: EDatePickerType.Months},
                            {action: () => changePickerType(EDatePickerType.Quarters), title: EDatePickerType.Quarters},
                            {action: () => changePickerType(EDatePickerType.Seasons), title: EDatePickerType.Seasons},
                        ]}/>
                        <button type='button' onClick={changeToDefault}>Reset to default </button>
                    </div>
                    <div className="pickers">
                        <PickerMarkup
                            openPickerType={openPickerType}
                            date={date}
                            onSelectDate={onSelectDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                        <PickerMarkup
                            openPickerType={openPickerType}
                            incrementYear={1}
                            date={date}
                            onSelectDate={onSelectDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                </div>
            )}
        </>
    )

}

export default DatePicker
