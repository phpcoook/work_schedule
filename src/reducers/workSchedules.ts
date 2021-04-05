const workSchedulesReducerDefaultState = {};

const workSchedulesReducer = (
    state = workSchedulesReducerDefaultState,
    action: { type: string; workSchedules: WorkSchedule[] | null }
) => {
    switch (action.type) {
        case 'POPULATE_WORK_SCHEDULES':
            return action.workSchedules;
        default:
            return state;
    }
};

export { workSchedulesReducer as default };
