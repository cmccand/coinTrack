import React, { Component } from 'react';
import { connect } from 'react-redux'
import { retrieveWallet } from '../../redux/modules/wallet';

class Wallet extends Component {
  componentDidMount() {
    this.props.retrieveWallet(this.props.match.params.walletName);
  }

  onClickAddr = addr => {
    this.props.history.push(`/wallets/${this.props.match.params.walletName}/addresses/${addr}`);
  }

  render() {
    return (
      <div>
        <h2>{this.props.match.params.walletName}</h2>
        <h5>Addresses</h5>
        <ul>
          { this.props.wallet
            ? this.props.wallet.map(addr => <li className="address" onClick={() => this.onClickAddr(addr)}>{addr}</li>)
            : false
          }
        </ul>
      </div>
    );
  }
};

export default connect(
  state => ({
    wallet: state.wallet.wallet
  }), {
    retrieveWallet
  }
)(Wallet)
