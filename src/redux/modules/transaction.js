import config from '../../config';
export const LOAD_TRANSACTIONS = 'cointracker/wallet/LOAD_TRANSACTIONS';
export const LOAD_TRANSACTIONS_SUCCESS = 'cointracker/wallet/LOAD_TRANSACTIONS_SUCCESS';
export const LOAD_TRANSACTIONS_FAIL = 'cointracker/wallet/LOAD_TRANSACTIONS_FAIL';

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        loading: true
      };
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.result.wallet_names
      }
    case LOAD_TRANSACTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

function loadTransactions() {
  return {
    type: LOAD_TRANSACTIONS
  }
}

function loadTransactionsSuccess(result) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    result
  }
}

function loadTransactionsFail(error) {
  return {
    type: LOAD_TRANSACTIONS_FAIL,
    error
  }
}

export function loadAllWallets() {
  return dispatch => {
    dispatch(loadTransactions());
    const token = config.token;
    return fetch(`https://api.blockcypher.com/v1/bcy/test/wallets?token=${token}`)
    .then(res => res.json()).then(response => {
      dispatch(loadTransactionsSuccess(response))
    }).catch(error => {
      dispatch(loadTransactionsFail(error));
    });
  }
}
