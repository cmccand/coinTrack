import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../Home';
import Faucet from '../Faucet';
import Wallet from '../Wallet';
import './index.css';


const App = () => (
  <div>
    <header className="app-header">
      <h1 className="title">CoinTrack</h1>
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/addfunds">Test Faucet</Link>
    </header>

    <main className="main">
      <Route exact path="/" component={Home} />
      <Route exact path="/addfunds" component={Faucet} />
      <Route path="/wallets/:walletName" component={Wallet} />
    </main>
  </div>
);

export default App;
