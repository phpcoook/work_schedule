const changeLogReducerDefaultState = {};

const changeLogsReducer = (
    state = changeLogReducerDefaultState,
    action: { type: string; changeLogs: changeLog[] }
) => {
    switch (action.type) {
        case 'UPDATE_CHANGE_LOG':
            return action.changeLogs;
        default:
            return state;
    }
};

export { changeLogsReducer as default };
