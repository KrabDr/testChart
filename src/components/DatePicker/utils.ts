import {range} from "../../utilities/utilities";
import dayjs from "dayjs";

export const getListOfYears = ():number[] => {
    return range(dayjs().get('year'), dayjs().add(11, 'year').get('year'));
}
