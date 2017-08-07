import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import request from 'superagent';

import auth from './auth';
import submission from './submission';
import search from './search';

const path = '/me';

const reducer = combineReducers({
  auth,
  submission,
  search,
});

export default createStore(reducer, applyMiddleware(thunk));
