import {ILegendsData} from "./Legend";


export const convertToLegends = <E extends any,T extends ILegendsData[] = ILegendsData[]>(data:T,titles: E | any)=>{
    return data.reduce<Record<string, any>>((acc, value) => {
        return {
            ...acc, [value.name]: {
                isActive: true,
                name: value.name,
                title: titles[value.name],
                color: value.color
            }
        }
    }, {})
}
