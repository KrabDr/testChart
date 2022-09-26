import React, {FC} from "react";
import styles from './PickerNavigation.module.scss'
import PickerButton from "../PickerButton/PickerButton";
import cn from "classnames";
import {EDatePickerPeriod} from "../../types";

interface INavigationsActions {
    action: () => void,
    title: EDatePickerPeriod
}

export interface IPickerNavigation {
    actions: INavigationsActions[],
    activePeriod:EDatePickerPeriod
}

const PickerNavigation: FC<IPickerNavigation> = ({
                                                     actions,activePeriod
                                                 }) => {
    return (
        <div className={styles.pickerNavigation}>
            {actions.map(({action, title}) =>
                <PickerButton key={title} fullWidth classes={cn(styles.pickerNavigationButton, {[styles.isActive]:activePeriod === title})} onClick={action} text={title} />
            )}
        </div>
    )
}

export default PickerNavigation
