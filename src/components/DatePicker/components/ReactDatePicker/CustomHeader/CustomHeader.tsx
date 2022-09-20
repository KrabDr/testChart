import dayjs from "dayjs";
import {getListOfYears} from "../../../utils";
import React, {FC, useEffect} from "react";

export interface ICustomHeader {
    monthDate: Date;
    date: Date;

    changeYear(year: number): void;

    changeMonth(month: number): void;

    customHeaderCount: number;

    decreaseMonth(): void;

    increaseMonth(): void;

    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;

    decreaseYear(): void;

    increaseYear(): void;

    prevYearButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
}

const CustomHeader: FC<ICustomHeader> = ({
                                             date,
                                             increaseYear,
                                             decreaseYear,
                                             nextYearButtonDisabled,
                                             prevYearButtonDisabled,
                                             changeYear,
                                             customHeaderCount,
                                         }) => {

    useEffect(()=>{
        changeYear(dayjs(date).add(customHeaderCount, 'year').get('year'))
    },[])

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <button onClick={decreaseYear} disabled={prevYearButtonDisabled}>
                {"<"}
            </button>
            <select
                value={dayjs(date).get('year')}
                onChange={({target: {value}}) => changeYear(Number(value))}
            >
                {getListOfYears().map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>


            <button onClick={increaseYear} disabled={nextYearButtonDisabled}>
                {">"}
            </button>
        </div>
    )

}


export default CustomHeader
