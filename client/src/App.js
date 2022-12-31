import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AppContext from './appContext';
import LandingPage from './pages/landingPage/LandingPage'
//import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home/Home';
import Sidebar from './component/sidebar/Sidebar';

import './App.css';

let selectedAccount;

const App = ({ web3 }) => {
  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [hasWalletAddress, setHasWalletAddress] = useState(false);
  const [hasAccountChanged, setHasAccountChanged] = useState(false);
  const [screenBlocked, setScreenBlocked] = useState(false);
  //const location = useLocation();

  useEffect(() => {
    init();
  }, []);


  const init = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        selectedAccount = accounts[0];
        //console.log(`Selected account is ${selectedAccount}`);

        //balance(String(selectedAccount));
      }).catch(e => console.log(e));

      const networkId = await web3.eth.net.getId();
      setNetworkId(networkId);
      setAccount(web3.utils.toChecksumAddress(selectedAccount));
      window.ethereum.on('accountsChanged', (accounts) => {
        setHasAccountChanged(true);
        if (!accounts[0]) {
          setHasWalletAddress(false);
        } else {
          setHasWalletAddress(true);
          setAccount(accounts[0]);
        }
      });
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    } else {
      alert("Install meta mask")
    }
  };

  const handleBlockScreen = (blocked) => {
    setScreenBlocked(blocked);
  };

  const handleAccountChanged = (newHasAccountChanged) => {
    setHasAccountChanged(newHasAccountChanged);
  };

  return (
    <AppContext.Provider value={{
      web3,
      handleBlockScreen,
      screenBlocked,
      account,
      hasWalletAddress,
      hasAccountChanged,
      handleAccountChanged,
      networkId
    }}
    >
      <Route path='/' exact component={LandingPage} />
      <ToastContainer autoClose={10000} />
    </AppContext.Provider>
  );
}

export default App;
