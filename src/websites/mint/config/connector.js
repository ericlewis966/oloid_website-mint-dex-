import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 42, 56, 97, 1337, 31337, 80001] });

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