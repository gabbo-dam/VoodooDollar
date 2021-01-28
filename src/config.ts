import { ChainId } from '@uniswap/sdk';
import { Configuration } from './gnostic-dollar/config';
import { BankInfo } from './gnostic-dollar';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./gnostic-dollar/deployments/deployments.rinkeby.json'),
    externalTokens: {
      TRI: ['0x3381c2cd88647b0aceBE2C17Ab4444D4fA7A9d89', 9],
      'TRI-ETH': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      PROPHET: ['0x05f866F1a94DDa57Cc9E828c4127e667A5FF046d', 9],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      // TODO: replace with real address
      'GSD_DAI-UNI-LPv2': ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      'GSS_DAI-UNI-LPv2': ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
    },
    baseLaunchDate: new Date('2020-01-29T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-03T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-03T00:00:00Z'),
  },
  production: {
    /*chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'wss://mainnet.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
    deployments: require('./gnostic-dollar/deployments/deployments.local.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      YFI: ['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      // TODO: replace with real address
      'BAC_DAI-UNI-LPv2': ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      'BAS_DAI-UNI-LPv2': ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18], */
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./gnostic-dollar/deployments/deployments.rinkeby.json'),
    externalTokens: {
      TRI: ['0x3381c2cd88647b0aceBE2C17Ab4444D4fA7A9d89', 9],
      'TRI-ETH': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      PROPHET: ['0x05f866F1a94DDa57Cc9E828c4127e667A5FF046d', 9],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      // TODO: replace with real address
      'GSD_DAI-UNI-LPv2': ['0x63D0C00C705836E95066a4A49835564adb4c000D', 18],
      'GSS_DAI-UNI-LPv2': ['0x59500d07BEE368c31273215cf4DbD11dfDa8E19d', 18],
    },
    baseLaunchDate: new Date('2021-01-28T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-02T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-02T00:00:00Z'),
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  GSDTRIPool: {
    name: 'Earn GSD by TRI',
    contract: 'GSDTRIPool',
    depositTokenName: 'TRI',
    earnTokenName: 'GSD',
    finished: false,
    sort: 1,
  },
  GSDETHTRILPPool: {
    name: 'Earn GSD by TRI-ETH',
    contract: 'GSDETHTRILPPool',
    depositTokenName: 'TRI-ETH',
    earnTokenName: 'GSD',
    finished: false,
    sort: 2,
  },
  GSDPROPHETPool: {
    name: 'Earn GSD by PROPHET',
    contract: 'GSDPROPHETPool',
    depositTokenName: 'PROPHET',
    earnTokenName: 'GSD',
    finished: false,
    sort: 3,
  },
  GSDDAIPool: {
    name: 'Earn GSD by DAI',
    contract: 'GSDDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'GSD',
    finished: false,
    sort: 4,
  },
  GSDDAILPTokenSharePool: {
    name: 'Earn GSS by GSD-DAI-LP',
    contract: 'GSDDAILPTokenSharePool',
    depositTokenName: 'GSD_DAI-UNI-LPv2',
    earnTokenName: 'GSS',
    finished: false,
    sort: 5,
  },
  GSSDAILPTokenSharePool: {
    name: 'Earn GSS by GSS-DAI-LP',
    contract: 'GSSDAILPTokenSharePool',
    depositTokenName: 'GSS_DAI-UNI-LPv2',
    earnTokenName: 'GSS',
    finished: false,
    sort: 6,
  },
};

// export default configurations[process.env.NODE_ENV];
export default configurations.development;
