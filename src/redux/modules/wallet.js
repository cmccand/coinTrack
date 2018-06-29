import config from '../../config';
export const LOAD_WALLET = 'cointracker/wallets/wallet/LOAD_WALLET';
export const LOAD_WALLET_SUCCESS = 'cointracker/wallets/wallet/LOAD_WALLET_SUCCESS';
export const LOAD_WALLET_FAIL = 'cointracker/wallets/wallet/LOAD_WALLET_FAIL';

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case LOAD_WALLET:
      return {
        ...state,
        loading: true
      };
    case LOAD_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        wallet: action.result.addresses
      }
    case LOAD_WALLET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

function loadWallet() {
  return {
    type: LOAD_WALLET
  }
}

function loadWalletSuccess(result) {
  return {
    type: LOAD_WALLET_SUCCESS,
    result
  }
}

function loadWalletFail(error) {
  return {
    type: LOAD_WALLET_FAIL,
    error
  }
}

export function retrieveWallet(name) {
  return dispatch => {
    dispatch(loadWallet());
    const token = config.token;
    return fetch(`https://api.blockcypher.com/v1/bcy/test/wallets/${name}?token=${token}`)
    .then(res => res.json()).then(response => {
      dispatch(loadWalletSuccess(response))
    }).catch(error => {
      dispatch(loadWalletFail(error));
    });
  }
}
