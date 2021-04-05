import { Dispatch } from 'redux';
import { work_shift_schedule_change_log as changeLogs } from '../fixtures/workSchedules';

export const updateChangeLog = (changeLogs: changeLog[]) => ({
    type: 'UPDATE_CHANGE_LOG',
    changeLogs
});

export const fetchAllChangeLogs = () => {
    return async (dispatch: Dispatch) => {
        let response: any = {};
        response.status = 200;
        response.data = changeLogs;
        if (response.status === 200) {
            const users = response.data;
            dispatch(updateChangeLog(users));
        }
    };
};
