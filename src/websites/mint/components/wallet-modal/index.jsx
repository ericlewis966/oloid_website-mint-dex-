import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Swal from 'sweetalert2';
import { injected, walletconnect } from '../../config/connector';
import Modal from 'react-awesome-modal';
import SmoothButton from "../smooth-button/SmoothButton";

import './wallet-modal.css';
import MetamaskIcon from '../../assets/images/Metamask-icon.png';
import WalletConnectIcon from '../../assets/images/WalletConnect-icon.png';

const WalletModal = ({ show, width, height, effect, onClickAway }) => {

    const { activate, account, } = useWeb3React();

    const connectWalletconnect = async () => {
        activate(walletconnect);
    }

    const connectMetamask = () => {
        if (window.ethereum) {
            if (window.ethereum.networkVersion != "31337" && window.ethereum.networkVersion != "56") {
                onClickAway();
                Swal.fire({
                    icon: 'warning',
                    title: 'You are on the wrong network.',
                    text: `Please connect to Binance Smart Chain!`
                })
            } else {
                activate(injected);
            }
        } else {
            onClickAway();
            Swal.fire({
                icon: 'warning',
                title: 'No Wallet Detected',
                text: `Please Please install Metamask!`
            })
            return false;
        }
    }

    useEffect(() => {
        onClickAway();
    }, [account])

    return (
        <Modal visible={show} width={width} height={height} effect={effect} onClickAway={onClickAway}>
            <div className='flex col transaction-setting'>
                <div className='flex modal-header justify-center align-center'>
                    <h2>Connect Wallet</h2>
                </div>
                <div className='flex justify-center' style={{ marginTop: 30 }}>
                    <SmoothButton
                        label={
                            <>
                                <img src={MetamaskIcon} style={{ width: 50 }} />Connect Metamask
                            </>
                        }
                        onClick={connectMetamask}
                        style={{ width: '95%' }}
                    />
                </div>
                <div className='flex justify-center' style={{ marginTop: 30 }}>
                    <SmoothButton
                        label={
                            <>
                                <img src={WalletConnectIcon} style={{ width: 50 }} />Open WalletConnect
                            </>
                        }
                        onClick={connectWalletconnect}
                        style={{ width: '95%' }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default WalletModal;