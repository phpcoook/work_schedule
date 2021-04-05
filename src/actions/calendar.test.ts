import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { getCurrentWeek } from '../helpers/dateUtils';

import { updateWeekDays, fetchWeekDays } from './calendar';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const createMockStore = configureMockStore(middlewares);

const uid = 'uid123';
const defaultAuthState = { auth: { uid } };

const date = new Date();
const weekDays = getCurrentWeek(date);

test('create an action to populate users', () => {
    const action = updateWeekDays(weekDays);
    expect(action).toEqual({
        type: 'UPDATE_WEEK_DAYS',
        weekDays
    });
});

describe('async actions', () => {
    test('creates UPDATE_WEEK_DAYS when fetchWeekDays is called', (done) => {
        const store = createMockStore(defaultAuthState);
        store.dispatch<any>(fetchWeekDays(date)).then(() => {
            const actions = store.getActions();
            const expectedAction = {
                type: 'UPDATE_WEEK_DAYS',
                weekDays
            };
            expect(actions[0]).toEqual(expectedAction);
            done();
        });
    });
});
