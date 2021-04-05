const usersReducerDefaultState = {};

const usersReducer = (
    state = usersReducerDefaultState,
    action: { type: string; users: Users | null }
) => {
    switch (action.type) {
        case 'POPULATE_USERS':
            return action.users;
        default:
            return state;
    }
};

export { usersReducer as default };
