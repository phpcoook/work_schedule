import { Dispatch } from 'redux';
import {
    getWorkSchedule,
    getWorkScheduleByDateRange
} from '../services/workSchedule';

export const populateWorkSchedules = (workSchedules: WorkSchedule[]) => ({
    type: 'POPULATE_WORK_SCHEDULES',
    workSchedules
});

export const startPopulateWorkSchedules = () => {
    return (dispatch: Dispatch) => {
        return getWorkSchedule()
            .then((response) => {
                if (response.status === 200) {
                    const workSchedules = response.data;
                    dispatch(populateWorkSchedules(workSchedules));
                }
            })
            .catch((e) => {});
    };
};

export const fetchWorkScheduleByDateRange = (
    start_date: string,
    end_date: string
) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await getWorkScheduleByDateRange(
                start_date,
                end_date
            );
            if (response.status === 200 || response.status === 201) {
                const workSchedules = response.data;
                dispatch(populateWorkSchedules(workSchedules));
                return workSchedules;
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateWorkSchedule = (workSchedules: WorkSchedule[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(populateWorkSchedules(workSchedules));
    };
};
