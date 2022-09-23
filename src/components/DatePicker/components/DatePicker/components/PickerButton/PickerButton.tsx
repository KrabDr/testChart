import React, {FC} from "react";
import cn from "classnames";
import styles from './PickerButton.module.scss'

export interface IPickerButton {
    onClick: () => void
    text: string
    classes?: string,
    fullWidth?:boolean
}

const PickerButton: FC<IPickerButton> = ({
                                             onClick,
                                             text,
                                             classes,
                                             fullWidth
                                         }) => {

    return (
        <button className={cn(styles.pickerButton, classes ,{[styles.fullWidth]:fullWidth})} type='button' onClick={onClick}>{text}</button>
    )
}

export default PickerButton
