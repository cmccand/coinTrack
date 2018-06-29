import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import address from './address';
import wallets from './wallets';
import wallet from './wallet';

export default combineReducers({
  routing: routerReducer,
  address,
  wallets,
  wallet
});
