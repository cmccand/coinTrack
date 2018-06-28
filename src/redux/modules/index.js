import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import address from './address';

export default combineReducers({
  routing: routerReducer,
  address
});
