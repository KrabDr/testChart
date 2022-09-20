import React, {FC} from "react";
import ReactDatePicker from "react-datepicker";
import {getListOfYears} from "../../utils";
import dayjs from "dayjs";
import classNames from "classnames";
import './picker.scss';

const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween)

export interface IYearsPicker {
    value?: Date | null
    date: {
        endDate?: Date | null,
        startDate?: Date | null,
    },
    minDate?: Date | null
    maxDate?: Date | null
    onChange: (date: any) => void;
}

const Year: FC<any> = ({date, year, onChange}) => {
// @ts-ignore
    const isBetween = dayjs(dayjs(new Date(year, 0)).toDate()).isBetween(date.startDate, date.endDate, 'year')


    const handleOnChange = (year: number) => {
        const startYear = dayjs().year(year).startOf("month").startOf('year').toDate();
        const endYear = dayjs().year(year).endOf("month").endOf('year').toDate();
        if (!date.startDate || date.startDate && date.endDate) {
            onChange([startYear, null])
        } else if ((date.startDate && !date.endDate) || (date.startDate && !date.startDate)) {
            onChange([date.startDate, endYear])
        }

    }

    return <>
        <button type={"button"} onClick={() => handleOnChange(year)} className={classNames({
            'isBetween': isBetween,
            'isStartDate': dayjs(date.startDate).get('year') === year,
            'isEndDate': dayjs(date.endDate).get('year') === year,
        })}>
            {year}
        </button>
    </>
}


const YearsPicker: FC<IYearsPicker> = ({
                                           date, onChange, value, minDate,
                                           maxDate
                                       }) => {
    const {startDate, endDate} = date

    const list = getListOfYears()

    return (
        <div className="picker">
            {list.map((year) => {
                return <>
                    <Year date={date} year={year} onChange={onChange}/>
                    <br/>
                </>
            })}


            {/*<ReactDatePicker*/}
            {/*    inline*/}
            {/*    yearItemNumber={12}*/}
            {/*    showYearPicker*/}
            {/*    minDate={minDate}*/}
            {/*    maxDate={maxDate}*/}
            {/*    selected={value}*/}
            {/*    onChange={onChange}*/}
            {/*    startDate={startDate}*/}
            {/*    endDate={endDate}*/}
            {/*/>*/}
        </div>
    );
};


export default YearsPicker

