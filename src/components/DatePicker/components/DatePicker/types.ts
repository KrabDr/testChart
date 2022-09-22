export interface IIsSelecting {
    isStartDateSelected: boolean,
    isEndDateSelected: boolean,
}

export interface IDate {
    startDate: Date | null,
    endDate: Date | null,
}


export enum EDatePickerType {
    Months = 'months',
    Seasons = 'seasons',
    Quarters = 'quarters',
}


export interface IPickerBase {
    currentSelectionYear: Date,
    date: IDate,
    onSelectDate: (value: Date | null) => void
    minDate: Date | null
    maxDate: Date | null
}



export enum ESeason {
    Winter = 0,
    Summer = 1
}

export enum EMonthList {
    Jan = 0,
    Feb = 1,
    Mar = 2,
    Apr = 3,
    May = 4,
    Jun = 5,
    Jul = 6,
    Aug = 7,
    Sep = 8,
    Oct = 9,
    Nov = 10,
    Dec = 12
}


export enum ESeasonWinter {
    start = EMonthList.Oct,
    end = EMonthList.Mar
}

export enum ESeasonSummer {
    start = EMonthList.Apr,
    end = EMonthList.Sep
}

