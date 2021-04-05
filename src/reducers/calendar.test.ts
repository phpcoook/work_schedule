import weekDaysReducer from './calendar';
import { RootStateOrAny } from 'react-redux';
import { getCurrentWeek } from '../helpers/dateUtils';

const date = new Date();
const weekDays = getCurrentWeek(date);

test('should set default state', () => {
    const state = weekDaysReducer(undefined, {
        type: '@@INIT',
        weekDays: []
    });
    expect(state).toEqual({});
});

test('should update weekdays', () => {
    const action = {
        type: 'UPDATE_WEEK_DAYS',
        weekDays
    };

    const state: RootStateOrAny = weekDaysReducer(undefined, action);
    expect(state).toEqual(weekDays);
});
