import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {
    authReducer,
    workSchedulesReducer,
    usersReducer,
    calendarReducer,
    changeLogReducer
} from '../reducers';

/**
 * TS fix
 * Error - Property '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' does not exist on type 'Window & typeof globalThis'
 */
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export default () => {
    const middlewares = [thunk, sagaMiddleware];
    const store = createStore(
        combineReducers({
            auth: authReducer,
            workSchedules: workSchedulesReducer,
            users: usersReducer,
            calendar: calendarReducer,
            changeLogs: changeLogReducer
        }),
        composeEnhancers(applyMiddleware(...middlewares))
    );
    return store;
};
