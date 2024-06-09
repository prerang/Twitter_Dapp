import React from "react";

const ConnectWallet = ({ connectWallet}) => (
    <div className="connect">
        <button onClick={connectWallet}>Connect Wallet</button>
        <div id = "connectMessage">Please connect your wallet to tweet.</div>
    </div>
);

export default ConnectWallet;