import React, { useEffect, useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import WalletModal from "../wallet-modal";
import SearchContext from "../../contexts/SearchToken";

import SmoothButton from "../smooth-button/SmoothButton";
import './top-bar.css';

import Logo from '../../assets/images/logo.png';

const TopBar = () => {

    const { account, deactivate } = useWeb3React();
    const { update } = useContext(SearchContext);

    const [showWalletModal, setShowWalletModal] = useState(false);

    const disconnect = () => {
        deactivate();
    }

    return (
        <div className="flex space-between align-center justify-center top-bar-container">
            <div className="flex align-center menu-logo">
                <a href="https://tokenoloid.com/" target="_blank">
                    <img className="flex logo-image" src={Logo} />
                </a>
            </div>
            <div className="flex space-between align-center menu-link">
                <div className="flex menu-link-item" onClick={() => update({ app: 1 })}>Swap</div>
                <div className="flex menu-link-item" onClick={() => update({ app: 2 })}>Liquidity Pool</div>
            </div>
            <div className="flex align-center wallet-option">
                <div className="flex wallet-button">
                    <SmoothButton
                        label={!account ? `Wallet Connect` : `Disconnect (${account.substring(0, 5)}...${account.substring(account.length - 5, account.length - 1)})`}
                        onClick={ account ? disconnect :  () => setShowWalletModal(true)}
                    />
                </div>
            </div>
            <WalletModal width={'300px'} height={'350px'} show={showWalletModal} onClickAway={() => setShowWalletModal(false)} />
        </div>
    )
}

export default TopBar;