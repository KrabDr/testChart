import React, {FC} from "react";

interface INavigationsActions {
    action: () => void,
    title: string
}

export interface IPickerNavigation {
    actions: INavigationsActions[]
}

const PickerNavigation: FC<IPickerNavigation> = ({
                                                     actions
                                                 }) => {
    return (
        <ul className="pickerNavigation">
            {actions.map(({action, title}) =>
                <li>
                    <button type='button'
                            onClick={action}>{title}</button>
                </li>
            )}
        </ul>
    )
}

export default PickerNavigation
