import React, {FC} from "react";
import dayjs from "dayjs";
import {range} from "../../../../utilities/utilities";

export interface IPickerHeader {
    currentSelectionYear:Date,
    onHandleChangeYear: (count: number)=>void,
    minDate: Date
    maxDate: Date
}

const PickerHeader: FC<IPickerHeader> = ({
                                             currentSelectionYear,
                                             onHandleChangeYear,
                                             minDate,
                                             maxDate
                                         }) => {

    const currentYear = dayjs(currentSelectionYear).get('year')
    const availableYears = range(dayjs(minDate).get('year'),dayjs(maxDate).get('year'))


    return (
        <div style={{display: 'flex'}}>
            <button disabled={dayjs(currentSelectionYear).add(-1,'year').isBefore(minDate, 'year')}  onClick={() => onHandleChangeYear(currentYear-1)}>
                <svg width={15} height={15} viewBox="0 0 51.4 51.4">
                    <path
                        d="M31.4 45.8L15.3 29.7h36.1v-8H15.3L31.4 5.6 25.7 0 0 25.7l25.7 25.7"/>
                </svg>
            </button>
            <select
                value={currentYear}
                onChange={({target: {value}}) => onHandleChangeYear(Number(value))}
            >
                {availableYears.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button disabled={dayjs(currentSelectionYear).add(1,'year').isAfter(maxDate, 'year')} onClick={() => onHandleChangeYear(currentYear + 1)}>
                <svg width={15} height={15} viewBox="0 0 51.4 51.4">
                    <path d="M20 5.6l16.1 16.1H0v8h36.1L20 45.8l5.7 5.6 25.7-25.7L25.7 0"/>
                </svg>
            </button>
        </div>
    )
}

export default PickerHeader
