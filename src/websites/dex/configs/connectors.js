import { InjectedConnector } from '@web3-react/injected-connector';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";


export const injected = new InjectedConnector({ supportedChainIds: [56, 97] });

export const walletconnect = new WalletConnectConnector({
    bridge: "https://bridge.walletconnect.org",
    pollingInterval: 12000,
    infuraId: "your_infura_id",
    pollingInterval: 15000,
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: ["trust"],
    },
    chainId: 56,
    rpc: {
        56: "https://bsc-dataseed4.binance.org",
    },
});

// Create a connector
// export const walletconnect = new WalletConnect({
//     bridge: "https://bridge.walletconnect.org", // Required
//     qrcodeModal: QRCodeModal,
// });

// // Check if connection is already established
// if (!walletconnect.connected) {
//     // create new session
//     walletconnect.createSession();
// }

// // Subscribe to connection events
// walletconnect.on("connect", (error, payload) => {
//     if (error) {
//         throw error;
//     }

//     // Get provided accounts and chainId
//     const { accounts, chainId } = payload.params[0];
// });

// walletconnect.on("session_update", (error, payload) => {
//     if (error) {
//         throw error;
//     }

//     // Get updated accounts and chainId
//     const { accounts, chainId } = payload.params[0];
// });

// walletconnect.on("disconnect", (error, payload) => {
//     if (error) {
//         throw error;
//     }
//     // Delete connector
// });