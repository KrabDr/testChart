import {FC, PropsWithChildren} from "react";
import cn from "classnames";
import styles from './Icon.module.scss'

export interface IIconButton {
    classes?:string,
}

const Icon:FC<PropsWithChildren<IIconButton>> = ({classes,children}) => {

    return (
        <div className={cn(styles.icon, classes)}>
            <div className={cn(styles.iconInner)}>{children}</div>
        </div>
    )
}

export  default Icon
