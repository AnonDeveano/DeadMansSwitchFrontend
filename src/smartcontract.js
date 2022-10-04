import './SmartContract.css';
import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { dms_abi } from "./dms_json_abi.js";
import { erc20_abi } from "./erc20_abi.js";

function SmartContract() {
    const [EtherBalance, setEtherBalance] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0); 
    const [time, setTime] = useState(0);
    

    const API_KEY = process.env.REACT_APP_API_KEY;
    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

    const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY);
    const wallet = new ethers.Wallet(PRIVATE_KEY);   
    const signer = wallet.connect(provider);
    
    let contract = new ethers.Contract(CONTRACT_ADDRESS, dms_abi, signer);

    /////////////
    // SETTERS // 
    ////////////

    const setNewDestinationAddress = async () => {
        let tx = await contract.setNewAddress(address);
        console.log(tx.hash);
    }

    const setNewOwner = async () => {
        let tx = await contract.setNewOwner(address);
        console.log(tx.hash);
    }

    const setTimePeriod = async () => {
        let tx = await contract.setTimePeriod(time);
        console.log(time);
        console.log(tx.hash);
    }

    /////////////
    // GETTERS //   
    ////////////

    const getBalance = async () => {
        const balance = await contract.getBalance();
        const EtherBalance = ethers.utils.formatEther(balance);
        setEtherBalance(EtherBalance);
        console.log(EtherBalance)
    }

    const getTokenBalance = async () => {
        let tx = await contract.getTokenBalance(address);
        let tokenBal = ethers.utils.formatUnits(tx);
        console.log(tokenBal);
    }

    const getTokenArray = async () => {
        let tx = await contract.getTokenAddresses();
        console.log(tx);
    }

    const returnTimePeriod = async () => {
        let tx = await contract.getTimePeriod();
        console.log(tx.hash);
        console.log(tx.toString());

    }

    ////////////////
    // FUNCTIONS //
    //////////////

    const depositEther = async () => {
        let ethAmount = {
            value: ethers.utils.parseEther(amount)
        };
        let tx = await contract.depositEthers(ethAmount);
        console.log(tx.hash);
    }

    const withdrawEther = async () => {
        let ethAmount = {
            value: ethers.utils.parseEther(amount)
        };
        let tx = await contract.withdrawEthers(ethAmount);
        console.log(tx.hash);
    }

    const approveToken = async () => {
        let tokenContract = new ethers.Contract(address, erc20_abi, signer);
        let approvalAmt = ethers.utils.parseUnits(amount);
        let tx = await tokenContract.approve(CONTRACT_ADDRESS, approvalAmt);
        console.log(tx.hash);
    }

    const depositTokens = async () => {
        let txamount = ethers.utils.parseUnits(amount);
        let tx = await contract.depositTokens(address, txamount);
        console.log(tx.hash);
    }

    const withdrawTokens = async () => {
        let tx = await contract.withdrawTokens(address);
        console.log(tx.hash);
    }

    const Ping = async () => {
        let tx = await contract.Ping();
        console.log(tx.hash);
    }

    

    return (
        <div className='SC'>
            <h2 className='bal_button'> Smart Contract Balance: {EtherBalance} ether </h2>

            <h2 style={{color: "orange"}}> Smart Contract Functions </h2>

            <input
                className='inputField'
                type="tel"
                placeholder="Enter decimal value..."
                onChange={e => setAmount(e.target.value)}
                required
            />

            <div className="divider"/>

            <input
                className='inputField'
                type="text"
                placeholder="ONLY ERC20 USE; enter token address to interact with ERC20"
                onChange={e => setAddress(e.target.value)}
                required
            />

            <br />
            <br />
            
            <button className='sc_button' onClick={getBalance}> Get Balance </button>

            <div className="divider"/>

            <button className='sc_button' onClick={depositEther}> Deposit Ether </button>

            <div className="divider"/>

            <button className='sc_button' onClick={withdrawEther}> Withdraw Ether </button>

            <div className="divider"/>

            <button className='sc_button' onClick={Ping}> Ping </button>


            <br />
            <br />

            <button className='sc_button' onClick={approveToken}> Approve Token (ERC20) </button>

            <div className="divider"/>

            <button className='sc_button' onClick={depositTokens}> Deposit Token (ERC20) </button>

            <div className="divider"/>

            <button className='sc_button' onClick={withdrawTokens}> Withdraw Token (ERC20) </button>

            <br />
            <br />

            <button className='sc_button' onClick={getTokenBalance}> Retrieve Token Balance </button>

            <div className="divider"/>

            <button className='sc_button' onClick={getTokenArray}> Retrieve Token Array </button>

            <br />
            <br />

            <h2 style={{color: "orange"}}> Admin/Setter Functions </h2>

            <h3 className='warning'>  Double check this as certain functions will 'brick' your instance of the contract with an invalid input! </h3>

            <input
                className='inputField'
                type="text"
                placeholder="Enter address..."
                onChange={e => setAddress(e.target.value)}
                required
            />

            <br />
            <br />

            <button className='sc_button' onClick={setNewDestinationAddress}> Change Destination Address </button>

            <div className="divider"/>

            <button className='sc_button' onClick={setNewOwner}> Change Contract Owner </button>

            <br />
            <br />

            <input
                className='inputField'
                type="number"
                placeholder="Enter time (in seconds)"
                onChange={e => setTime(e.target.value)}
                required
            />

            <br />
            <br />

            <button className='sc_button' onClick={setTimePeriod}> Set Time Period </button>

            <div className="divider"/>

            <button className='sc_button' onClick={returnTimePeriod}> When Does Ping Expire? </button>

        </div>
    )
}

export default SmartContract;