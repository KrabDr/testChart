import React, {FC} from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import '../../PickerDay.scss'
import {EDatePickerType, IPickerBase} from "../../types";
import {months} from "../../data";
import {range} from "../../../../../../utilities/utilities";
import useActiveDateClasses from "../../hooks/UseActiveDateClasses";


export interface IPickerMonth extends IPickerBase {
    month: number
}

const PickerMonth: FC<IPickerMonth> = ({
                                           currentSelectionYear,
                                           onSelectDate,
                                           date,
                                           month,
                                           minDate,
                                           maxDate
                                       }) => {
    const isDisabled = dayjs(currentSelectionYear).set('month', month).isBefore(minDate, 'months') && dayjs(currentSelectionYear).set('month', month).isBefore(maxDate, 'month')
    const currentDate = dayjs(currentSelectionYear).set('month', month).toDate();


   const {activeDateClasses} =  useActiveDateClasses({
       date,
       currentDate,
       currentSelectionYear,
       type:EDatePickerType.Months
   })

    return (

        <button
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectDate(dayjs(currentSelectionYear).set('month', month).toDate())}
            className={classNames('day', {
                ...activeDateClasses,
            })}
        >
            <div>
                {months[month]}
            </div>
        </button>
    )
}

const PickerMonths: FC<IPickerBase> = ({
                                             date,
                                             onSelectDate,
                                             currentSelectionYear,
                                             maxDate,
                                             minDate
                                         }) => {
    return (
        <div className={'days-wrap'}>
            {range(0, 11).map((month) => <PickerMonth
                date={date}
                currentSelectionYear={currentSelectionYear}
                onSelectDate={onSelectDate}
                month={month}
                maxDate={maxDate}
                minDate={minDate}
            />)}
        </div>

    )
}

export default PickerMonths
