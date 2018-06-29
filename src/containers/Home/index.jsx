import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { loadAllWallets } from '../../redux/modules/wallets';
import './index.css';

class Home extends Component {

  componentDidMount() {
    this.props.loadAllWallets();
  }

  onClickWallet = wallet => {
    this.props.history.push(`/wallets/${wallet}`);
  }

  renderWallets = () => (
    this.props.wallets
      ? (
        <ul>
          {
            this.props.wallets.map(wallet => (
              <li className="wallet-name" onClick={() => this.onClickWallet(wallet)}>
                {wallet}
              </li>
            ))
          }
        </ul>
      )
      : false
  )

  render() {
    return (
      <div>
        <h2>Wallets</h2>
        { this.renderWallets() }
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.wallets.loading,
    wallets: state.wallets.wallets
  }), {
    loadAllWallets
  }
)(Home);
