import classNames from "classnames";
import React, {ChangeEvent} from "react";
import styles from "./Checkbox.module.scss";

export interface ICheckbox {
    id?: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    title: string;
    disabled?: boolean;
    bgColor?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, ICheckbox>(
    ({ id, checked, onChange, name, disabled,title,bgColor, ...rest }, ref) => {
        return (
            <label className={styles.checkboxWrapper} htmlFor={id} data-testid={`checkbox-${id}`}>
                <input
                    ref={ref}
                    type="checkbox"
                    checked={checked}
                    name={name}
                    id={id}
                    onChange={onChange}
                    disabled={disabled}
                    {...rest}
                />
                <div
                    className={classNames(styles.checkbox, { [styles.isActive]: checked })}
                    style={{backgroundColor: checked ? bgColor : undefined }}
                >

                </div>
                <div className={styles.checkboxTitle}>
                    {title}
                </div>
            </label>
        );
    }
);
