import styles from './Tooltip.module.scss'
import {forwardRef} from "react";
import classNames from "classnames";

export const Tooltip = forwardRef<HTMLDivElement,any>(
    ({children, ...props}, ref) => {
        const {top,left,classes, ...rest} = props
        return (
            <div
                className={classNames(styles.tooltipWrapper, classes)}
                style={{
                top,
                left
            }}>
                <div className={styles.tooltip} ref={ref} {...rest} >
                    {children}
                </div>
            </div>
        );
    }
);
