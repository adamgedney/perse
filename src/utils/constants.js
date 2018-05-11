import { INFURA_API_KEY, mneumonic } from './config';

export const MNEUMONIC = mneumonic;

export const INFURA_MAIN_NETWORK_URL = `https://mainnet.infura.io/${INFURA_API_KEY}`; //Mainnet	production network	
export const INFURA_ROPSTEN_NETWORK_URL = `https://ropsten.infura.io/${INFURA_API_KEY}` //Ropsten	test network	
export const INFURA_INFURANET_NETWORK_URL = `https://infuranet.infura.io/${INFURA_API_KEY}` //INFURAnet	test network	
export const INFURA_KOVAN_NETWORK_URL = `https://kovan.infura.io/${INFURA_API_KEY}`; //Kovan	test network	
export const INFURA_RINKEBY_NETWORK_URL = `https://rinkeby.infura.io/${INFURA_API_KEY}`; //Rinkeby	test network	
export const INFURA_IPFS_GATEWAY_URL = `https://ipfs.infura.io`; //IPFS	gateway	