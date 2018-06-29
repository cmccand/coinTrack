import config from '../../config';
export const LOAD_WALLETS = 'cointracker/wallets/LOAD_WALLETS';
export const LOAD_WALLETS_SUCCESS = 'cointracker/wallets/wallets/LOAD_WALLETS_SUCCESS';
export const LOAD_WALLETS_FAIL = 'cointracker/wallets/wallets/LOAD_WALLETS_FAIL';

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case LOAD_WALLETS:
      return {
        ...state,
        loading: true
      };
    case LOAD_WALLETS_SUCCESS:
      return {
        ...state,
        loading: false,
        wallets: action.result.wallet_names
      }
    case LOAD_WALLETS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

function loadWallets() {
  return {
    type: LOAD_WALLETS
  }
}

function loadWalletsSuccess(result) {
  console.log(result);
  return {
    type: LOAD_WALLETS_SUCCESS,
    result
  }
}

function loadWalletsFail(error) {
  return {
    type: LOAD_WALLETS_FAIL,
    error
  }
}

export function loadAllWallets() {
  return dispatch => {
    dispatch(loadWallets());
    const token = config.token;
    return fetch(`https://api.blockcypher.com/v1/bcy/test/wallets?token=${token}`)
    .then(res => res.json()).then(response => {
      dispatch(loadWalletsSuccess(response))
    }).catch(error => {
      dispatch(loadWalletsFail(error));
    });
  }
}
