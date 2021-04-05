import authReducer from './auth';
import { RootStateOrAny } from 'react-redux';

test('should set default state', () => {
    const state = authReducer(undefined, {
        type: '@@INIT',
        user_id: null
    });
    expect(state).toEqual({});
});

test('should login (set uid)', () => {
    const user_id = 'uid123';
    const action = {
        type: 'LOGIN',
        user_id
    };
    const state: RootStateOrAny = authReducer(undefined, action);
    expect(state.user_id).toEqual(user_id);
});

test('should logout (remove uid)', () => {
    const action = {
        type: 'LOGOUT',
        user_id: null
    };
    const state = authReducer({ user_id: 'uid123' }, action);
    expect(state).toEqual({});
});
