import React, {FC} from "react";
import ReactDatePicker from "react-datepicker";
import CustomHeader from "./CustomHeader/CustomHeader";

export interface IMonthPicker {
    value?:Date | null
    date:{
        endDate?:Date | null,
        startDate?:Date | null,
    },
    minDate?:Date | null
    maxDate?:Date | null
    onChange: (date:any) => void;
    customHeaderCount: any;
}

const MonthPicker:FC<IMonthPicker> = ({date,onChange,value,minDate,
                                          maxDate,customHeaderCount }) => {
    const {startDate,endDate} = date

    return (
        <div className="legend">
            <ReactDatePicker
                inline
                selectsRange
                showMonthYearPicker
                minDate={minDate}
                maxDate={maxDate}
                selected={value}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                renderCustomHeader={(props) => <CustomHeader {...props} customHeaderCount={customHeaderCount}/>}
            />
        </div>
    );
};
export default MonthPicker
