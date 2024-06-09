import React, { useState, useEffect, useCallback } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Web3 from 'web3';
import contractABI from './abi.json';
import ConnectWallet from './ConnectWallet';
import TweetForm from './TweetForm';
import TweetList from './TweetList';
import './App.css';

const contractAddress = '0xA060f716bb474eE4e6377feCd7EB2DBc65F6322C';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [tweets, setTweets] = useState([]);

  const loadTweets = useCallback(async () => {
    if (contract && account) {
      try {
        const tempTweets = await contract.methods.getAllTweets(account).call();
        const sortedTweets = [...tempTweets].sort((a, b) => 
          Number(b.timestamp) - Number(a.timestamp)
        );
        setTweets(sortedTweets);
      } catch (error) {
        console.error('Error loading tweets:', error);
      }
    }
  }, [contract, account]);

  useEffect(() => {
    if (web3 && contract && account) {
      loadTweets();
    }
  }, [web3, contract, account, loadTweets]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
      } catch (err) {
        console.error('User rejected request:', err);
      }
    } else {
      alert('No web3 provider detected. Please install MetaMask.');
    }
  };

  const createTweet = async (content) => {
    try {
      await contract.methods.createTweet(content).send({ from: account });
      loadTweets();
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  const likeTweet = async (author, id) => {
    try {
      await contract.methods.likeTweet(author, id).send({ from: account });
      loadTweets();
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  const deleteTweet = async (id) => {
    try {
      await contract.methods.deleteTweet(id).send({ from: account });
      loadTweets();
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };

  return (
    <div className="container">
      <h1>Twitter DAPP</h1>
      {!account ? (
        <ConnectWallet connectWallet={connectWallet} />
      ) : (
        <>
          <div id="userAddress">Connected: {account}</div>
          <TweetForm createTweet={createTweet} />
          <TweetList tweets={tweets} likeTweet={likeTweet} deleteTweet={deleteTweet} account={account} />
        </>
      )}
    </div>
  );
};

export default App;
