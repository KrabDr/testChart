import React, {FC} from "react";
import ReactDatePicker from "react-datepicker";

export interface ISeasonPicker {
    value?:Date | null
    date:{
        endDate?:Date | null,
        startDate?:Date | null,
    },
    minDate?:Date | null
    maxDate?:Date | null
    onChange: (date:any) => void;
}

const SeasonPicker:FC<ISeasonPicker> = ({date,onChange,value,minDate,
                                          maxDate }) => {
    const {startDate,endDate} = date

    return (
        <div className="legend">
            <ReactDatePicker
                inline
                selectsRange
                showQuarterYearPicker
                minDate={minDate}
                maxDate={maxDate}
                selected={value}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
};
export default SeasonPicker

