import React, {FC} from "react";
import {printCorrectFormat} from "../../utils";
import {EDatePickerType, IDate} from "../../types";

export interface IPickerButton {
    onOpen: (arg: boolean) => void,
    type: EDatePickerType,
    date: IDate
}

const PickerOpenButton: FC<IPickerButton> = ({
                                             onOpen,
                                             type,
                                             date
                                         }) => (
    <button
        className="picker-button"
        onClick={() => onOpen(true)}>
        <div className="picker-button-start">
            {printCorrectFormat(type, date.startDate)}
        </div>
        <span>-</span>
        <div className="picker-button-end">
            {printCorrectFormat(type, date.endDate)}
        </div>
    </button>
)

export default PickerOpenButton
