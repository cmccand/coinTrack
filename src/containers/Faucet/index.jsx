import React from 'react'
import { connect } from 'react-redux'
import { addFundsToAddress } from '../../redux/modules/address';

const Faucet = props => (
  <div>
    <h1>Add Funds to Wallet</h1>
    <button onClick={() => props.addFundsToAddress("By9G8M6X1fHMQ4EAJhqhzx8dJchcnBofcN", 1000)}>Add Funds</button>
  </div>
);

export default connect(
  state => ({
    loading: state.loading
  }), {
    addFundsToAddress
  }
)(Faucet);
