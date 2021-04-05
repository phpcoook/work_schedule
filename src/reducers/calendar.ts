const weekDaysReducerDefaultState = {};

const calendarReducer = (
    state = weekDaysReducerDefaultState,
    action: { type: string; weekDays: weekDay[]; selectedDate: string }
) => {
    switch (action.type) {
        case 'UPDATE_WEEK_DAYS':
            return {
                ...state,
                weekDays: action.weekDays
            };
        case 'UPDATE_SELECTED_DAY':
            return {
                ...state,
                selectedDate: action.selectedDate
            };
        default:
            return state;
    }
};

export { calendarReducer as default };
