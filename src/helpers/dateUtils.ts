import { shortDays } from '../constants/calendar';
import moment from 'moment';

/**
 *
 * Get the week of passed date and returns
 * all the dates for that week
 *
 * @param {Date} currDate
 * @returns {Array}
 */
const getCurrentWeek = (currDate: Date) => {
    let curr = new Date(currDate);
    let week = [];
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i;
        let date = new Date(curr.setDate(first));
        week.push({
            dateString: date.toISOString().slice(0, 10),
            day: shortDays[date.getDay()],
            date: date.getDate()
        });
    }
    return week;
};

/**
 * Accepts the seconds in integer and return
 * formated time in HH:mm format
 *
 * @param {number} d
 * @returns {string}
 */
const secondsToHms = (d: number) => {
    return moment
        .utc(moment.duration(d, 'seconds').asMilliseconds())
        .format('HH:mm');
};

export { getCurrentWeek, secondsToHms };
