import styles from './Tooltip.module.scss'
import {forwardRef} from "react";

export const Tooltip = forwardRef<HTMLDivElement,any>(
    ({children, ...props}, ref) => {
        const {top,left, ...rest} = props
        return (
            <div
                className={styles.tooltipWrapper}
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
