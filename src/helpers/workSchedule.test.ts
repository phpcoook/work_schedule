import {
    getLoggedInUserWorkSchedule,
    countObjectLength,
    filterWorkScheduleByDateRange
} from './workSchedule';
import workSchedules from '../fixtures/workSchedules';

test('should get work schedule of user', () => {
    const user_id = 2;
    var schedule: any = [];
    schedule['2021-03-15'] = [
        {
            id: 7,
            user_id: 2,
            shifts: [
                {
                    start_datetime: '2021-03-15 09:00:00',
                    end_datetime: '2021-03-15 14:00:00'
                },
                {
                    start_datetime: '2021-03-15 16:00:00',
                    end_datetime: '2021-03-15 19:00:00'
                }
            ],
            work_time_seconds: 28800,
            comment: 'Full day of meetings'
        }
    ];
    const userWorkSchedule = {
        totalWorkDays: 0,
        totalWorkHours: 57600,
        userWorkSchedule: schedule
    };
    const result = getLoggedInUserWorkSchedule(workSchedules, user_id);
    console.log(result);
    expect(result).toEqual(userWorkSchedule);
});

test('should count object length', () => {
    const a = {};
    const result = countObjectLength(a);
    expect(result).toEqual(0);

    const b = {
        a: 1,
        b: 2
    };
    const result2 = countObjectLength(b);
    expect(result2).toEqual(2);
});

test('should get work schedule by date range', () => {
    const schedule = [
        {
            id: 10,
            user_id: 1,
            shifts: [
                {
                    start_datetime: '2021-03-12 09:00:00',
                    end_datetime: '2021-03-12 13:00:00'
                },
                {
                    start_datetime: '2021-03-12 15:00:00',
                    end_datetime: '2021-03-12 18:00:00'
                }
            ],
            work_time_seconds: 28800,
            comment: '5 core 3 flex'
        }
    ];
    const result = filterWorkScheduleByDateRange(
        workSchedules,
        '2021-03-12',
        '2021-03-13'
    );
    expect(result).toEqual(schedule);
});
