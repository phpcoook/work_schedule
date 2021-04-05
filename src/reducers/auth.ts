const authReducerDefaultState = {};

const authReducer = (
    state = authReducerDefaultState,
    action: { type: string; user_id: string | null }
) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user_id: action.user_id
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export { authReducer as default };
