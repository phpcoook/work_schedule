import {
    getCurrentWeek,
    secondsToHms,
    extractTimeFromDate,
    changeDateFormat,
    timeStampToYmdHis
} from './dateUtils';

test('should get all the days of week based on date', () => {
    const date = new Date('2021-03-16');
    const weekDays = [
        { dateString: '2021-03-15', day: 'Mon', date: 15 },
        { dateString: '2021-03-16', day: 'Tue', date: 16 },
        { dateString: '2021-03-17', day: 'Wed', date: 17 },
        { dateString: '2021-03-18', day: 'Thu', date: 18 },
        { dateString: '2021-03-19', day: 'Fri', date: 19 },
        { dateString: '2021-03-20', day: 'Sat', date: 20 },
        { dateString: '2021-03-21', day: 'Sun', date: 21 }
    ];
    const result = getCurrentWeek(date);
    expect(result).toEqual(weekDays);
});

test('should get all the days of week based on date', () => {
    const result = secondsToHms(2600);
    expect(result).toEqual('0h 43m');
});

test('should extract time string from date string', () => {
    const result = extractTimeFromDate('2021-03-16 08:00:00');
    expect(result).toEqual('08:00');
});

test('should change date format', () => {
    const result = changeDateFormat('2021-03-22 08:00:00');
    expect(result).toEqual('Monday 22, 08:00');
});
