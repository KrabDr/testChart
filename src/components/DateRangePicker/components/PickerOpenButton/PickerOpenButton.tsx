import React, {FC} from "react";
import {printCorrectFormat} from "../../utils";
import {EDatePickerPeriod, IDate} from "../../types";
import {IconCalendar, IconDateArrow} from "../../assests";
import styles from './PickerOpenButton.module.scss'
import classNames from "classnames";

export interface IPickerButton {
    isOpen: boolean,
    type: EDatePickerPeriod,
    date: IDate
}

const PickerOpenButton: FC<IPickerButton> = ({
                                                 isOpen,
                                                 type,
                                                 date,
                                             }) => (
    <div
        className={styles.pickerButton}
       >
        <IconCalendar className={styles.iconCalendar}/>
        <div className={styles.pickerButtonInfo}>
            <div className={styles.pickerButtonType}>{type}:</div>
            <div className={styles.pickerButtonStart}>
                {printCorrectFormat(type, date.startDate)}
            </div>
            <span>-</span>
            <div className={styles.pickerButtonEnd}>
                {printCorrectFormat(type, date.endDate)}
            </div>
        </div>
        <IconDateArrow className={classNames(styles.iconDateArrow, {
            [styles.isOpen]: isOpen
        })}/>
    </div>
)

export default PickerOpenButton
