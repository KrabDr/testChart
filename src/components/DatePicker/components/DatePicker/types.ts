export interface IIsSelecting {
    isStartDateSelected: boolean,
    isEndDateSelected: boolean,
}

export interface IDate {
    startDate: Date | null,
    endDate: Date | null,
}


export enum EDatePickerType {
    Months= 'months',
    Seasons= 'seasons',
    Quarters= 'quarters',
}
