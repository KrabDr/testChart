import {FC} from "react";
import {Checkbox} from "./components/Checkox";

export interface ILegend {
    data: any
    toggleActiveState: (arg: any) => void
}

const Legend: FC<ILegend> = ({data, toggleActiveState}) => (
    <div className="legend">
        {Object.entries(data).map(([key, value]: any) => {
            return <>
                <Checkbox
                    checked={value.isActive}
                    onChange={() => toggleActiveState(value.name)}
                    name={value.name}
                    title={value.title}
                    bgColor={value.color}
                />
            </>
        })}
    </div>
);
export default Legend
