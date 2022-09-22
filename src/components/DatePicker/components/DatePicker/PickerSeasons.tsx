import React, {FC, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";
import './PickerDay.scss'
import {IDate, IIsSelecting} from "./types";
import {quarters, seasonMonths, seasons} from "./data";
import {range} from "../../../../utilities/utilities";


const styles = {
    termInput: "termInput",
    active: "active",
    termInputControl: "termInputControl",
    selecting: "selecting",
    picker: "picker",
    pickerCaret: "pickerCaret",
    yearOneContext: "yearOneContext",
    yearTwoContext: "yearTwoContext",
    pickerControl: "pickerControl",
    isStartMonth: "isStartMonth",
    isEndMonth: "isEndMonth",
    pickerControlInner: "pickerControlInner",
    cellWithinRange: "cellWithinRange",
    selected: "selected"
}

const {
    pickerControl,
    pickerControlInner,
} = styles


export interface IPickerSeasons {
    currentSelectionYear: any,
    date: IDate,
    hoverDate: IDate,
    onSelectDate: (value: Date | null) => void
    onHoverDate: (value: Date | null) => void
    minDate: Date | null
    maxDate: Date | null,
    selectingRange: IIsSelecting
}

export interface IPickerSeason extends IPickerSeasons {
    season: number

}

export enum ESeason {
    Winter = 0,
    Summer = 1
}

export const getNumberOfHalfYear = (month: number,): ESeason | null => {
    if (seasonMonths.winter.some((i) => i === month)) {
        return ESeason.Winter
    }
    if (seasonMonths.summer.some((i) => i === month)) {
        return ESeason.Summer
    }
    return null
}

const getIsBetweenSeason = (season: Dayjs, startSeason: Dayjs, endSeason: Dayjs) => {
    return season.toDate() > startSeason.toDate() && season.toDate() < endSeason.toDate()
}

const PickerSeason: FC<IPickerSeason> = ({
                                             currentSelectionYear,
                                             onSelectDate,
                                             date,
                                             onHoverDate,
                                             hoverDate,
                                             season,
                                             minDate,
                                             maxDate,
                                             selectingRange
                                         }) => {

    const type = [9, 8]


    const isDisabled = dayjs(currentSelectionYear).quarter(season + 1).isBefore(minDate, 'months') && dayjs(currentSelectionYear).quarter(season + 1).isBefore(maxDate, 'month')

    const hoverEndDateYear = dayjs(hoverDate.endDate).get('year')
    const hoverEndDateQuarter = dayjs(hoverDate.endDate).quarter()

    const startDateYear = dayjs(date.startDate).get('year');
    const startDateMonth = dayjs(date.startDate).get('month');

    const endDateYear = dayjs(date.endDate).get('year');
    const endDateMonth = dayjs(date.endDate).get('month')


    const currentYear = dayjs(currentSelectionYear).get('year')
    const previousYear = dayjs(currentSelectionYear).add(-1, 'year').get('year')
    const currentDate = dayjs().set('month', type[season]).set('year', currentYear).add(season === 0 ? -1 : 0, 'year')


    const dateSeasons = [dayjs().set('year', currentYear - 1).set('month', 9).startOf('month').toDate(), dayjs().set('year', currentYear).set('month', 3).startOf('month').toDate()]

    const [dayClassNames, setDayClassNames] = useState<any>({
        cellWithinRange: false,
        selected: false,
        isStartMonth: false,
        isEndMonth: false
    })


    const getSelected = (dateYear: number, dateMonth: number) => {
        const seasonOfYear = getNumberOfHalfYear(dateMonth)
        if (season === seasonOfYear) {
            if (season === ESeason.Winter) {
                return  dateMonth === 9 ? previousYear == dateYear :   currentYear == dateYear
            }
            return currentYear == dateYear
        }
    }


    useEffect(() => {
        const isBetween = getIsBetweenSeason(currentDate, dayjs(date.startDate), dayjs(date.endDate));
        setDayClassNames({
            ...dayClassNames,
            selected: getSelected(startDateYear, startDateMonth) || getSelected(endDateYear, endDateMonth),
            cellWithinRange: isBetween
        })
    }, [date, currentSelectionYear])


    return (
        <button type={"button"}
            // disabled={isDisabled}
                onClick={() => onSelectDate(dateSeasons[season])}
                className={classNames('season', {
                    ...dayClassNames,
                })}
        >
            <div className={pickerControlInner}>
                {seasons[season]} {season === 0 ? currentYear - 1 : currentYear}
            </div>
        </button>
    )
}

const PickerSeasons: FC<IPickerSeasons> = ({
                                               date,
                                               hoverDate,
                                               onSelectDate,
                                               onHoverDate,
                                               currentSelectionYear,
                                               minDate, maxDate,
                                               selectingRange
                                           }) => {
    return (

        <div className={'season-wrap'}>
            {range(0, 1).map((season) => <PickerSeason
                date={date}
                currentSelectionYear={currentSelectionYear}
                onHoverDate={onHoverDate}
                onSelectDate={onSelectDate}
                hoverDate={hoverDate}
                season={season}
                minDate={minDate}
                maxDate={maxDate}
                selectingRange={selectingRange}
            />)}
        </div>

    )
}

export default PickerSeasons
