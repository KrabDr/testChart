import React, {FC} from "react";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import '../../PickerDay.scss'
import {EDatePickerPeriod, IPickerBase} from "../../types";
import {months} from "../../data";
import {range} from "../../../../../../utilities/utilities";
import useActiveDateClasses from "../../hooks/UseActiveDateClasses";

import styles from './PickerMonths.module.scss'

const cx = classNames.bind(styles);

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
       type:EDatePickerPeriod.Months,
   })


    return (

        <button
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectDate(dayjs(currentSelectionYear).set('month', month).toDate())}
            className={cx( styles.month, { ...activeDateClasses })}
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
        <div className={styles.monthList}>
            {range(0, 11).map((month) => <PickerMonth
                key={`month-${month}`}
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
