import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

// saga
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  ,
  sagaMiddleware,
];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);
