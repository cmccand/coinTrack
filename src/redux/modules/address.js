import config from '../../config';
export const FUND_ADDRESS = 'cointracker/addresses/FUND_ADDRESS';
export const FUND_ADDRESS_SUCCESS = 'cointracker/addresses/FUND_ADDRESS_SUCCESS';
export const FUND_ADDRESS_FAIL = 'cointracker/addresses/FUND_ADDRESS_FAIL';

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
        data: action.error
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
