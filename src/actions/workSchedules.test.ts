import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import {
    populateWorkSchedules,
    startPopulateWorkSchedules
} from './workSchedules';
import workSchedules from '../fixtures/workSchedules';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
const createMockStore = configureMockStore(middlewares);

const uid = 'uid123';
const defaultAuthState = { auth: { uid } };

test('create an action to populate workSchedules', () => {
    const action = populateWorkSchedules(workSchedules);
    expect(action).toEqual({
        type: 'POPULATE_WORK_SCHEDULES',
        workSchedules
    });
});

describe('async actions', () => {
    test('creates POPULATE_ACTIVITIES when startPopuplateActivities has been done', (done) => {
        const store = createMockStore(defaultAuthState);
        store.dispatch<any>(startPopulateWorkSchedules()).then(() => {
            const actions = store.getActions();
            const expectedAction = {
                type: 'POPULATE_WORK_SCHEDULES',
                workSchedules
            };
            expect(actions[0]).toEqual(expectedAction);
            done();
        });
    });
});
