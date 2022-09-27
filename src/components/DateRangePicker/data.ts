import {ESeasonSummer, ESeasonWinter} from "./types";

export const quarters = ["Q1: Jan-Mar", "Q2: Apr-Jun", "Q3: Jul-Sep", "Q4: Oct-Dec"];


export const months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"];

export const seasonMonths = {
    winter: [ESeasonWinter.start, ESeasonWinter.end],
    summer: [ESeasonSummer.start, ESeasonSummer.end]
}
