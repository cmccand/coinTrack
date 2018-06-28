import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../Home';
import Faucet from '../Faucet';

const headerStyle = {
  fontFamily: 'IBM Plex Sans'
};

const App = () => (
  <div>
    <header style={headerStyle}>
      <Link to="/">Home</Link>
      <Link to="/addfunds">Add Funds to Wallet</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/addfunds" component={Faucet} />
    </main>
  </div>
);

export default App;
