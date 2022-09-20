import classNames from "classnames";
import React, {ChangeEvent, CSSProperties} from "react";
import "./Checkbox.scss";

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
            <label className={"checkbox_wrapper"} htmlFor={id} data-testid={`checkbox-${id}`}>
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
                    className={classNames("checkbox", { isActive: checked })}
                    style={{backgroundColor: checked ? bgColor : undefined }}
                >

                </div>
                <div className='checkbox-title'>
                    {title}
                </div>
            </label>
        );
    }
);
