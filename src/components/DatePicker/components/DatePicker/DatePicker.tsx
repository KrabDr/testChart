import React, {FC, useRef, useState} from "react";
import PickerMarkup from "./components/PickerMarkup/PickerMarkup";
import dayjs from "dayjs";
import {EDatePickerPeriod, IDate, IIsSelecting} from "./types";
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import {formatToCurrentType} from "./utils";
import PickerOpenButton from "./components/PickerOpenButton/PickerOpenButton";
import PickerNavigation from "./components/PickerNavigation/PickerNavigation";
import styles from './DatePicker.module.scss'
import PickerButton from "./components/PickerButton/PickerButton";
import PopperWrapper from "../../../PopperWrapper/PopperWrapper";
import {useOnClickOutside} from "../../../../hooks/UseOnClickOutside";

dayjs.extend(quarterOfYear)


export interface IDatePicker {
    defaultStartValue?: Date | null
    defaultEndValue?: Date | null
    minDate?: Date
    maxDate?: Date
    pickerPeriod?: EDatePickerPeriod
}


export const DatePicker: FC<IDatePicker> = ({
                                                defaultStartValue = null,
                                                defaultEndValue = null,
                                                pickerPeriod = EDatePickerPeriod.Months,
                                                minDate = dayjs().startOf('month').toDate(),
                                                maxDate = dayjs().add(5, 'year').endOf('year').endOf('month').toDate(),
                                            }) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState<boolean>(false)
    const [openPickerPeriod, setOpenPickerPeriod] = useState<EDatePickerPeriod>(pickerPeriod)
    const [isSelectingRange, setIsSelectingRange] = useState<IIsSelecting>({
        isStartDateSelected: false,
        isEndDateSelected: false,
    })

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
                endDate: dayjs(prevValue.startDate).isBefore(value) ? formatToCurrentType(openPickerPeriod, value!, 'end') : formatToCurrentType(openPickerPeriod, prevValue.startDate!, 'end')
            }))
            setIsSelectingRange({
                isStartDateSelected: false,
                isEndDateSelected: false
            })
            setOpen(false)
        }

    }

    const changePickerType = (type: EDatePickerPeriod) => {
        setIsSelectingRange({
            isStartDateSelected: true,
            isEndDateSelected: false
        })
        setDate({
            startDate: null,
            endDate: null
        })
        setOpenPickerPeriod(type)
    }

    const changeToDefault = () => {
        setDate({
            startDate: defaultStartValue,
            endDate: defaultEndValue
        })
        setOpenPickerPeriod(EDatePickerPeriod.Months)
        setIsSelectingRange({
            isStartDateSelected: true,
            isEndDateSelected: false
        })
    };


    const toggleOpenState = (state: boolean) => {
        setOpen(state)
        setIsSelectingRange(state ? {
            isStartDateSelected: true,
            isEndDateSelected: false
        } : {
            isStartDateSelected: false,
            isEndDateSelected: false
        })
    }


    useOnClickOutside(ref, () => {
        setOpen(false)
    })

    return (
        <div className={styles.pickerWrapper}>
            <PopperWrapper
                placement={"bottom-end"}
                popperClasses={styles.pickerButton}
                popper={<PickerOpenButton date={date} type={openPickerPeriod} isOpen={isOpen}/>}
                visible={isOpen}
                onVisibleChange={() => toggleOpenState(true)}
            >
                <div ref={ref} className={styles.picker}>
                    <div className={styles.pickerAside}>
                        <div className={styles.pickerAsidePeriod}>Period</div>
                        <PickerNavigation
                            activePeriod={openPickerPeriod}
                            actions={[
                                {
                                    action: () => changePickerType(EDatePickerPeriod.Months),
                                    title: EDatePickerPeriod.Months
                                },
                                {
                                    action: () => changePickerType(EDatePickerPeriod.Quarters),
                                    title: EDatePickerPeriod.Quarters
                                },
                                {
                                    action: () => changePickerType(EDatePickerPeriod.Seasons),
                                    title: EDatePickerPeriod.Seasons
                                },
                            ]}/>
                        <PickerButton onClick={changeToDefault} text="Reset" classes={styles.resetButton} fullWidth/>
                    </div>
                    <div className={styles.pickers}>
                        <PickerMarkup
                            openPickerType={openPickerPeriod}
                            date={date}
                            onSelectDate={onSelectDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                        <div className={styles.divider}></div>
                        <PickerMarkup
                            openPickerType={openPickerPeriod}
                            incrementYear={1}
                            date={date}
                            onSelectDate={onSelectDate}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>
                </div>
            </PopperWrapper>

        </div>
    )
}

export default DatePicker
