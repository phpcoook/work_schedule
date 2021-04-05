import { Dispatch } from 'redux';
import { users as userList } from '../fixtures/users';

export const populateUsers = (users: Users) => ({
    type: 'POPULATE_USERS',
    users
});

export const fetchAllUsers = () => {
    return async (dispatch: Dispatch) => {
        let response: any = {};
        response.status = 200;
        response.data = userList;
        if (response.status === 200) {
            const users = response.data;
            dispatch(populateUsers(users));
        }
    };
};
