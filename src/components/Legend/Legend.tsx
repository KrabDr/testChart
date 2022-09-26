import {Checkbox} from "../Checkbox";
import {EExternalData} from "../../data";
import styles from './Legend.module.scss'

export interface ILegendComponent<T extends string> {
    data: Record<T, ILegend<T>>
    toggleActiveState: (arg: T) => void
}

export interface ILegend<T> {
    isActive: boolean
    color: string,
    name: T,
    title: EExternalData
}

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
function ObjectEntries<T extends object>(t: T): Entries<T>[] {
    return Object.entries(t) as any;
}


const Legend = <T extends string>({data, toggleActiveState}:ILegendComponent<T> ) => (
    <div className={styles.legend}>
        {ObjectEntries(data).map(([key, value]) =>
            <div key={key}>
                <Checkbox
                    key={key}
                    checked={value.isActive}
                    onChange={() => toggleActiveState(value.name)}
                    name={value.name}
                    title={value.title}
                    bgColor={value.color}
                />
            </div>)}
    </div>
);
export default Legend
