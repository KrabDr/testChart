import React, {FC} from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import '../../PickerDay.scss'
import {EDatePickerType, ESeason, ESeasonSummer, ESeasonWinter, IPickerBase} from "../../types";
import {range} from "../../../../../../utilities/utilities";
import useActiveDateClasses from "../../hooks/UseActiveDateClasses";
import {getFormattedSeason} from "../../utils";


export interface IPickerSeason extends IPickerBase {
    season: number
}


const PickerSeason: FC<IPickerSeason> = ({
                                             currentSelectionYear,
                                             onSelectDate,
                                             date,
                                             season,
                                         }) => {

    const currentYear = dayjs(currentSelectionYear).get('year')
    const currentDate = dayjs().set('year', season === ESeason.Winter ? currentYear - 1 : currentYear)
        .set('month', season === ESeason.Winter ? ESeasonWinter.start : ESeasonSummer.start).startOf('month').toDate()

    const {activeDateClasses} = useActiveDateClasses({
        date,
        currentDate,
        currentSelectionYear,
        type: EDatePickerType.Seasons
    })

    return (
        <button type={"button"}
                onClick={() => onSelectDate(currentDate)}
                className={classNames('season', {
                    ...activeDateClasses,
                })}
        >
            <div>
                {getFormattedSeason(currentDate)}
            </div>
        </button>
    )
}

const PickerSeasons: FC<IPickerBase> = ({
                                               date,
                                               onSelectDate,
                                               currentSelectionYear,
                                               minDate, maxDate,
                                           }) => {
    return (

        <div className={'season-wrap'}>
            {range(0, 1).map((season) => <PickerSeason
                date={date}
                currentSelectionYear={currentSelectionYear}
                onSelectDate={onSelectDate}
                season={season}
                minDate={minDate}
                maxDate={maxDate}
            />)}
        </div>

    )
}

export default PickerSeasons
