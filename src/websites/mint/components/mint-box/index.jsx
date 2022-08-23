import React, { useEffect, useState } from 'react';
import MintBoxLogo from '../../assets/images/now-meta-logo-m2-blackt.png';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import WalletModal from "../wallet-modal";
import { ethers } from 'ethers';
import toSafeNumber from '../../utils/toSafeNumber';
import getContract from '../../utils/getContract'

import InputNumber from '../../components/input-number';
import * as AwesomeButton from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

import nmeta_icon from '../../assets/images/nmeta.png';

import NFTArtifact from '../../abi/META.json';
import TokenArtifact from '../../abi/NMETA.json';


const MintBox = () => {
    const nftAddress = "0xE458916033A222D3786B60e438B8C97A3b550D6D";
    const tokenAddress = "0x0F6266A9e9214ea129D4A001E9541d643a34C772";

    const [count, setCount] = useState(1);
    const [max, setMax] = useState(10);
    const [mintTokenAmount, setMintTokenAmount] = useState(0);
    const [pending, setPending] = useState(false);
    const [showWalletModal, setShowWalletModal] = useState(false);

    const { account, library, chainId } = useWeb3React();


    const tokenMint = async () => {
        if (chainId != 31337 && chainId != 56) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Please switch network to Binance Smart Chain!`
            })
            return false;
        }
        const nftContract = await getContract(nftAddress, NFTArtifact.abi, library?.getSigner(), null);
        const tokenContract = await getContract(tokenAddress, TokenArtifact.abi, library?.getSigner(), null);
        const decimals = await tokenContract.decimals();
        const _balance = await tokenContract.balanceOf(account);
        const balance = toSafeNumber(_balance.toString(), decimals);
        
        try {
            setPending(true);
            var tx = await tokenContract.approve(nftAddress, ethers.utils.parseUnits(String(balance), decimals));
            await tx.wait();
            tx = await nftContract.tokenMint(count);
            await tx.wait();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `You bought ${count} NFTs successfully!`
            })
            setPending(false);
        } catch (e) {
            setPending(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.data.message ? `${e.data.message}` : `${e.message}`
            })
        }
    }

    useEffect(() => {
        (async () => {
            if (account) {
                const nftContract = await getContract(nftAddress, NFTArtifact.abi, library?.getSigner(), null);
                const tokenContract = await getContract(tokenAddress, TokenArtifact.abi, library?.getSigner(), null);
                const decimals = await tokenContract.decimals();
                const _mintTokenAmount = await nftContract.mintPriceByToken();
                setMintTokenAmount(toSafeNumber(_mintTokenAmount.toString(), decimals));
            }
        })()
    }, [account])

    return (
        <div className='flex col center mint-box'>
            <div className='flex center mint-box-header'>
                <a href="https://tokenoloid.com/" target="_blank">
                    <img className='mint-box-logo' src={MintBoxLogo} />
                </a>
            </div>
            <div className='flex center '>
                <div className='mint-count'>
                    <InputNumber
                        value={count}
                        max={max}
                        onMinus={() => setCount(count > 1 ? count - 1 : 1)}
                        onPlus={() => setCount(count < max ? count + 1 : max)}
                        onMax={() => setCount(max)}
                    />
                </div>
            </div>
            <div className='flex row space-between mint-price'>
                <div className='flex'>Total:</div>
                {/* <div className='flex'>{mintPrice * count} BNB</div> */}
                <div className='flex'>{mintTokenAmount * count} OLOID</div>
            </div>
            {
                account ? <div className='flex account-tag'>{account}</div> : <div></div>
            }
            <div className='flex center mint-confirm'>
                {
                    !account ? <AwesomeButton.AwesomeButton style={{ width: '100%' }} size="large" type="primary" onPress={() => setShowWalletModal(true)}>Connect Wallet</AwesomeButton.AwesomeButton>
                        : <>
                            {/* <AwesomeButton.AwesomeButton style={{ width: '50%' }} size="large" type="primary" onPress={mint}><img className='token-icon' src={bnb_icon} alt='BNB'/>MINT with BNB</AwesomeButton.AwesomeButton> */}
                            <AwesomeButton.AwesomeButton disabled={pending} style={{ width: '100%' }} size="large" type="primary" onPress={tokenMint}><img className='token-icon' src={nmeta_icon} alt='NMETA' />MINT with OLOID</AwesomeButton.AwesomeButton>
                        </>
                }
            </div>
            <WalletModal width={'300px'} height={'350px'} show={showWalletModal} onClickAway={() => setShowWalletModal(false)} />
        </div>
    )
}

export default MintBox;