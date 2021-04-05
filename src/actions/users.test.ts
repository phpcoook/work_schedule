import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { users } from '../fixtures/users';

import { populateUsers, fetchAllUsers } from './users';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const createMockStore = configureMockStore(middlewares);

const uid = 'uid123';
const defaultAuthState = { auth: { uid } };

test('create an action to populate users', () => {
    const action = populateUsers(users);
    expect(action).toEqual({
        type: 'POPULATE_USERS',
        users
    });
});

describe('async actions', () => {
    test('creates POPULATE_USERS when fetchAllUsers is called', (done) => {
        const store = createMockStore(defaultAuthState);
        store.dispatch<any>(fetchAllUsers()).then(() => {
            const actions = store.getActions();
            const expectedAction = {
                type: 'POPULATE_USERS',
                users
            };
            expect(actions[0]).toEqual(expectedAction);
            done();
        });
    });
});
