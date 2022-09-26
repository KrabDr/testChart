import React, {FC, useState} from "react";
import classNames from "classnames";
import Icon from "../Icon/Icon";
import {IconDateArrow} from "../DatePicker/components/DatePicker/assests";
import styles from './Select.module.scss'
import PopperWrapper from "../PopperWrapper/PopperWrapper";


export interface IOption {
    value: string | number,
    option: string | number
}

export interface ISelect {
    classes?: string,
    value: string | number,
    onChange: (arg: number | string) => void,
    options: Array<IOption>
}

const Select: FC<ISelect> = ({classes, value, onChange, options}) => {

    const [isActive, setActive] = useState<boolean>(false)

    const toggleSelect = () => setActive(!isActive)

    const onSelectValue = (value: string | number) => {
        onChange(value)
        toggleSelect()
    }

    return (
        <div className={classNames(styles.select, classes)}>
            <PopperWrapper
                visible={isActive}
                onVisibleChange={setActive}
                placement='bottom-start'
                closeOnOutsideClick
                popper={( <div className={styles.selectedValue}>
                    <div className={styles.value}>
                        {value}
                    </div>
                    <Icon>
                        <IconDateArrow/>
                    </Icon>
                </div>)}>
                <div className={classNames(styles.dropdown)}>
                    {options.map((option) => (
                        <button
                            type="button"
                            className={classNames(styles.dropdownItem, {[styles.isSelected]: option.value === value})}
                            key={option.value}
                            onClick={() => onSelectValue(option.value)}>
                            {option.option}
                        </button>
                    ))}
                </div>

            </PopperWrapper>
        </div>
    )
}

export default Select
