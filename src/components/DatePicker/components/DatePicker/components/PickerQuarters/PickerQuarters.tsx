import React, {FC} from "react";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import '../../PickerDay.scss'
import {EDatePickerPeriod, IPickerBase} from "../../types";
import {quarters} from "../../data";
import {range} from "../../../../../../utilities/utilities";
import useActiveDateClasses from "../../hooks/UseActiveDateClasses";
import styles from "./PickerQuarters.module.scss";

const cx = classNames.bind(styles);

export interface IPickerQuarter extends IPickerBase {
    quarter: number
}

const PickerQuarter: FC<IPickerQuarter> = ({
                                               currentSelectionYear,
                                               onSelectDate,
                                               date,
                                               quarter,
                                               minDate,
                                               maxDate
                                           }) => {
    const isDisabled = dayjs(currentSelectionYear).quarter(quarter + 1).isBefore(minDate, 'months')
        && dayjs(currentSelectionYear).quarter(quarter + 1).isBefore(maxDate, 'month')
    const currentDate =  dayjs(currentSelectionYear).quarter(quarter + 1).toDate()

    const {activeDateClasses} =  useActiveDateClasses({
        date,
        currentDate,
        currentSelectionYear,
        type:EDatePickerPeriod.Quarters
    })

    return (
        <button type={"button"}
                disabled={isDisabled}
                onClick={() => onSelectDate(dayjs(dayjs(currentSelectionYear).quarter(quarter + 1)).toDate())}
                className={cx( styles.quarter, { ...activeDateClasses })}
        >
            <div>
                {quarters[quarter]}
            </div>
        </button>
    )
}

const PickerQuarters: FC<IPickerBase> = ({
                                                 date,
                                                 onSelectDate,
                                                 currentSelectionYear,
                                                 minDate, maxDate
                                             }) => {
    return (

        <div className={styles.quartersList}>
            {range(0,3).map((quarter) => <PickerQuarter
                date={date}
                currentSelectionYear={currentSelectionYear}
                onSelectDate={onSelectDate}
                quarter={quarter}
                minDate={minDate}
                maxDate={maxDate}
            />)}
        </div>

    )
}

export default PickerQuarters
