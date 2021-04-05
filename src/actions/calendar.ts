import { Dispatch } from 'redux';
import { getCurrentWeek } from '../helpers/dateUtils';

export const updateWeekDays = (weekDays: weekDay[]) => ({
    type: 'UPDATE_WEEK_DAYS',
    weekDays
});

export const updateSelectedDay = (selectedDate: string) => ({
    type: 'UPDATE_SELECTED_DAY',
    selectedDate
});

export const fetchWeekDays = (date: Date) => {
    return async (dispatch: Dispatch) => {
        const weekDays = await getCurrentWeek(date);
        dispatch(updateWeekDays(weekDays));
    };
};
