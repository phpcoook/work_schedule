import usersReducer from './users';
import { users } from '../fixtures/users';
import { RootStateOrAny } from 'react-redux';

test('should set default state', () => {
    const state = usersReducer(undefined, {
        type: '@@INIT',
        users: null
    });
    expect(state).toEqual({});
});

test('should populate users', () => {
    const action = {
        type: 'POPULATE_USERS',
        users
    };

    const state: RootStateOrAny = usersReducer(undefined, action);
    expect(state).toEqual(users);
});
