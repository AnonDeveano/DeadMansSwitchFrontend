import './App.css';
import { ethers } from 'ethers';
import React, { useEffect, useState } from "react";


function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };


  return (
    <div className="App">
      <header className="App-header">

       <h1 className="title"> Dead Man's Switch </h1>

       <button className="choob" onClick={connectHandler}> Connect Account </button>

       <br />
       <div className="account">
          Account: {account}
       </div>
       

       
        
       <br />
       <div className="balance">
          Contract Address: { CONTRACT_ADDRESS }
       </div>

       <br />

       <div className="balance">
          Wallet Balance: {balance} {balance ? "ETH" : null}
       </div>
       {errorMessage}
    
      </header>
    </div>
  );
}

export default App;
