import React, {FC} from "react";
import dayjs from "dayjs";
import {range} from "../../../../utilities/utilities";
import styles from './PickerHeader.module.scss';
import IconButton from "../../../IconButton/IconButton";
import {IconLeftArrow, IconRightArrow} from "../../assests";
import Select, {IOption} from "../../../Select/Select";

export interface IPickerHeader {
    currentSelectionYear: Date,
    onHandleChangeYear: (count: number) => void,
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
    const availableYears: IOption[] = range(dayjs(minDate).get('year'), dayjs(maxDate).get('year')).map((year) => ({
        option: year,
        value: year
    }))


    return (
        <div className={styles.pickerHeader}>
            <IconButton
                onClick={() => onHandleChangeYear(currentYear - 1)}
                disabled={dayjs(currentSelectionYear).add(-1, 'year').isBefore(minDate, 'year')}>
                <IconLeftArrow/>
            </IconButton>
            <Select value={currentYear} onChange={(value) => onHandleChangeYear(Number(value))} options={availableYears}/>

            <IconButton
                onClick={() => onHandleChangeYear(currentYear + 1)}
                disabled={dayjs(currentSelectionYear).add(1, 'year').isAfter(maxDate, 'year')}>
                <IconRightArrow/>
            </IconButton>
        </div>
    )
}

export default PickerHeader
