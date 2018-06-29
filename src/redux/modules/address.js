import config from '../../config';
export const FUND_ADDRESS = 'cointracker/address/FUND_ADDRESS';
export const FUND_ADDRESS_SUCCESS = 'cointracker/address/FUND_ADDRESS_SUCCESS';
export const FUND_ADDRESS_FAIL = 'cointracker/address/FUND_ADDRESS_FAIL';
export const LOAD_ADDRESS = 'cointracker/address/LOAD_ADDRESS';
export const LOAD_ADDRESS_SUCCESS = 'cointracker/address/LOAD_ADDRESS_SUCCESS';
export const LOAD_ADDRESS_FAIL = 'cointracker/address/LOAD_ADDRESS_FAIL';

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case FUND_ADDRESS:
      return {
        ...state,
        loading: true
      };
    case FUND_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      }
    case FUND_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case LOAD_ADDRESS:
      return {
        ...state,
        loading: true,
        value: action.result
      };
    case LOAD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.result
      }
    case LOAD_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

function fundAddress() {
  return {
    type: FUND_ADDRESS
  }
}

function fundAddressSuccess(result) {
  return {
    type: FUND_ADDRESS_SUCCESS,
    result
  }
}

function fundAddressFail(error) {
  return {
    type: FUND_ADDRESS_FAIL,
    error
  }
}

function loadAddress() {
  return {
    type: LOAD_ADDRESS
  }
}

function loadAddressSuccess(result) {
  return {
    type: LOAD_ADDRESS_SUCCESS,
    result
  }
}

function loadAddressFail(error) {
  return {
    type: LOAD_ADDRESS_FAIL,
    error
  }
}

export function addFundsToAddress(address, amount) {
  return dispatch => {
    dispatch(fundAddress());
    const token = config.token;
    const data = { "address": address, "amount": amount };
    return fetch(`https://api.blockcypher.com/v1/bcy/test/faucet?token=${token}`, {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(res => res.json()).then(response => {
      dispatch(fundAddressSuccess(response))
    }).catch(error => {
      dispatch(fundAddressFail(error));
    });
  }
}
// 
// export function loadFromAddress(address) {
//   return dispatch => {
//     dispatch(loadAddress());
//     const token = config.token;
//     return fetch(`https://api.blockcypher.com/v1/bcy/test/faucet?token=${token}`, {
//       body: JSON.stringify(data),
//       method: 'POST'
//     }).then(res => res.json()).then(response => {
//       dispatch(loadAddressSuccess(response))
//     }).catch(error => {
//       dispatch(loadAddressFail(error));
//     });
//   }
// }
