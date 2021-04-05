import workSchedulesReducer from './workSchedules';
import workSchedules from '../fixtures/workSchedules';
import { RootStateOrAny } from 'react-redux';

test('should set default state', () => {
    const state = workSchedulesReducer(undefined, {
        type: '@@INIT',
        workSchedules: null
    });
    expect(state).toEqual({});
});

test('should populate work schedules', () => {
    const action = {
        type: 'POPULATE_WORK_SCHEDULES',
        workSchedules
    };

    const state: RootStateOrAny = workSchedulesReducer(undefined, action);
    expect(state).toEqual(workSchedules);
});
