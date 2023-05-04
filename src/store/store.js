import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';



import { rootReducer } from './root-reducer';

const middlewares = [logger, thunk];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
