import * as _ from 'lodash';

/**
 * Filter the workschedules of passed user_id, calculate total work days
 * and total work time based on user's schedule and returns all this info
 * in an object.
 *
 * @param {Array} workSchedules
 * @param {number} user_id
 * @returns {Object}
 */
const getLoggedInUserWorkSchedule = (
    workSchedules: WorkSchedule[],
    user_id: number
) => {
    const userWorkSchedule = _.filter(workSchedules, { user_id: user_id });
    let dailyWorkSchedule: any = [];
    let totalWorkHours: number = 0;

    for (const [, value] of Object.entries(userWorkSchedule)) {
        dailyWorkSchedule[value.date] = [];
        totalWorkHours += value.work_time_seconds;
        dailyWorkSchedule[value.date].push(value);
    }

    return {
        userWorkSchedule: dailyWorkSchedule,
        totalWorkDays: dailyWorkSchedule.length,
        totalWorkHours: totalWorkHours
    };
};

/**
 * Count no of properties of object
 *
 * @param {Object} object
 * @returns
 */
const countObjectLength = (object: Object) => {
    var key,
        count = 0;

    for (key in object) {
        if (object.hasOwnProperty(key)) count++;
    }
    return count;
};

/**
 * Filter the work schedule data between two given
 * dates.
 *
 * @param {Array} workSchedules
 * @param {string} startDate
 * @param {string} endDate
 * @returns
 */
const filterWorkScheduleByDateRange = (
    workSchedules: WorkSchedule[],
    startDate: string,
    endDate: string
) => {
    return _.filter(workSchedules, function (item) {
        return (
            item.user_id === 1 &&
            _.inRange(
                Date.parse(item.date),
                Date.parse(startDate),
                Date.parse(endDate) + 1
            )
        );
    });
};

const getTimeIntervalClass = (
    workShifts: any,
    selectedDate: string,
    value: string
) => {
    let className = '';
    if (workShifts.length > 0) {
        for (let i = 0; i < workShifts.length; i++) {
            let startDateTime = Date.parse(
                selectedDate + ' ' + workShifts[i].start_time
            );
            let endDateTime = Date.parse(
                selectedDate + ' ' + workShifts[i].end_time
            );
            let timeLineDateTime = Date.parse(selectedDate + ' ' + value);

            if (
                timeLineDateTime >= startDateTime &&
                timeLineDateTime <= endDateTime
            ) {
                className = 'bg-green';
                if (timeLineDateTime === startDateTime) {
                    className += ' first';
                }

                if (timeLineDateTime === endDateTime) {
                    className += ' last';
                }
                break;
            }
        }
    }
    return className;
};

export {
    getLoggedInUserWorkSchedule,
    countObjectLength,
    filterWorkScheduleByDateRange,
    getTimeIntervalClass
};
