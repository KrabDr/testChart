import React, {FC} from "react";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import {EDatePickerPeriod, ESeason, ESeasonSummer, ESeasonWinter, IPickerBase} from "../../types";
import {range} from "../../../../utilities/utilities";
import useActiveDateClasses from "../../hooks/UseActiveDateClasses";
import {getFormattedSeason} from "../../utils";
import styles from "./PickerSeasons.module.scss";

const cx = classNames.bind(styles);


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
        type: EDatePickerPeriod.Seasons
    })

    return (
        <button type={"button"}
                onClick={() => onSelectDate(currentDate)}
                className={cx( styles.season, { ...activeDateClasses })}
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

        <div className={styles.seasonList}>
            {range(0, 1).map((season) => <PickerSeason
                key={`season-${season}`}
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
