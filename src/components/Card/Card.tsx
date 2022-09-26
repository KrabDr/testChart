import {FC, PropsWithChildren} from "react";
import cn from "classnames";
import styles from './Card.module.scss'

export interface IIconButton {
    classes?:string,
}

const Card:FC<PropsWithChildren<IIconButton>> = ({classes,children}) => {

    return (
        <div className={cn(styles.card, classes)}>
           {children}
        </div>
    )
}

export  default Card
