import dayjs, {Dayjs} from "dayjs";
import {EDatePickerType, ESeason, ESeasonSummer, ESeasonWinter} from "./types";
import {months, quarters, seasonMonths} from "./data";

const getEndOfCurrentDate = (currentDate: Date, type: EDatePickerType): Date => {
    switch (type) {
        case EDatePickerType.Months:
            return dayjs(currentDate).endOf('month').toDate()
        case EDatePickerType.Quarters:
            return dayjs(currentDate).endOf('month').toDate()
        case EDatePickerType.Seasons:
            return dayjs(currentDate).endOf('month').toDate()
    }
}

export const getIsBetween = (currentDate: Date, startDate: Date | null, endDate: Date | null, type: EDatePickerType): boolean => {
    return currentDate > startDate! && getEndOfCurrentDate(currentDate, type) < endDate!
}


export const toStartOfYear = (date: Date): Dayjs => {
    if (dayjs(date).get('month') === ESeasonWinter.end) {
        return dayjs(date).add(-1, 'year').set('month', ESeasonWinter.start).startOf('month')
    }

    if (dayjs(date).get('month') === ESeasonSummer.end) {
        return dayjs(date).set('month', ESeasonSummer.start).startOf('month')
    }
    return dayjs(date)
}

export const toEndOfYear = (date: Date) => {
    if (dayjs(date).get('month') === ESeasonWinter.start) {
        return dayjs(date).set('month', ESeasonWinter.end).startOf('month')
    }

    if (dayjs(date).get('month') === ESeasonSummer.start) {
        return dayjs(date).set('month', ESeasonSummer.end).startOf('month')
    }
    return dayjs(date)
}


export const formatToCurrentType = (type: EDatePickerType, date: Date, direction: 'end' | 'start') => {
    switch (type) {
        case EDatePickerType.Months:
            if (direction === 'end') {
                return dayjs(date).endOf(type).toDate()
            }
            return dayjs(date).startOf(type).toDate()
        case EDatePickerType.Quarters:
            if (direction === 'end') {
                return dayjs(date).endOf(type).toDate()
            }
            return dayjs(date).startOf(type).toDate()
        case EDatePickerType.Seasons:
            switch (direction) {
                case 'end':
                    if (dayjs(date).get('month') === ESeasonWinter.start) {
                        return dayjs(date).add(1, 'year').set('month', ESeasonWinter.end).endOf('month').toDate()
                    }
                    return dayjs(date).set('month', ESeasonSummer.end).endOf('month').toDate()
                case "start":
                    return dayjs(date).startOf('month').toDate()
            }
    }
}


export const getFormattedSeason = (date: Date | null): string | undefined => {
    if (!dayjs(date).isValid()) return

    const year = Number(dayjs(date).format('YY'))
    if (seasonMonths.winter.some((s) => s === dayjs(date).get('month'))) {
        return `Winter: ${months[toStartOfYear(date!).get('month')]} ${year} - ${months[toEndOfYear(date!).get('month')]}  ${year + 1}  `
    }
    if (seasonMonths.summer.some((s) => s === dayjs(date).get('month'))) {
        return `Summer: ${months[toStartOfYear(date!).get('month')]} ${year} - ${months[toEndOfYear(date!).get('month')]}  ${year}  `
    }
}


export const printCorrectFormat = (type: EDatePickerType, date: Date | null) => {
    if (!dayjs(date).isValid()) return 'Choose Date'
    switch (type) {
        case EDatePickerType.Months:
            return dayjs(date).format('YYYY MMM')
        case EDatePickerType.Quarters:
            return `${quarters[dayjs(date).quarter() - 1]} ${dayjs(date).format('YYYY')}`
        case EDatePickerType.Seasons:
            return getFormattedSeason(date) ?? 'Choose Date'
    }
}


export const getNumberOfHalfYear = (month: number): ESeason | null => {
    if (seasonMonths.winter.some((i) => i === month)) {
        return ESeason.Winter
    }
    if (seasonMonths.summer.some((i) => i === month)) {
        return ESeason.Summer
    }
    return null
}
