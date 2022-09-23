import {FC, PropsWithChildren} from "react";
import classNames from "classnames";
import styles from './IconButton.module.scss';
import Icon from "../Icon/Icon";

export interface IIconButton {
    disabled?: boolean,
    onClick: () => void,
    classes?:string,
}

const IconButton:FC<PropsWithChildren<IIconButton>> = ({classes,disabled,onClick,children}) => {

    return (
        <button
            className={classNames(styles.iconButton, classes)}
            disabled={disabled}
            onClick={onClick}
        >
            <Icon classes={styles.iconButtonInner}>{children}</Icon>
        </button>
    )
}

export  default IconButton
