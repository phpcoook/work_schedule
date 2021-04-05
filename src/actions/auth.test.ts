import { login, logout } from './auth';

test('create an action to login', () => {
    const user_id = 1;
    const action = login(user_id);
    expect(action).toEqual({
        type: 'LOGIN',
        user_id
    });
});

test('create an action to logout', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});
