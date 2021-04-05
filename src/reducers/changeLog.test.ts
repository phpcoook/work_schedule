import changeLogReducer from './changeLog';
import { RootStateOrAny } from 'react-redux';
import { work_shift_schedule_change_log as changeLogs } from '../fixtures/workSchedules';

test('should set default state', () => {
    const state = changeLogReducer(undefined, {
        type: '@@INIT',
        changeLogs: []
    });
    expect(state).toEqual({});
});

test('should update weekdays', () => {
    const action = {
        type: 'UPDATE_CHANGE_LOG',
        changeLogs
    };

    const state: RootStateOrAny = changeLogReducer(undefined, action);
    expect(state).toEqual(changeLogs);
});
