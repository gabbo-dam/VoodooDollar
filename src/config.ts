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
      USDx: ['0x0a4612DE67DF29115a2E320aff6601C32D38B4C1', 9],
      'ETH_TRI-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
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
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./gnostic-dollar/deployments/deployments.rinkeby.json'),
    externalTokens: {
      USDx: ['0x0a4612DE67DF29115a2E320aff6601C32D38B4C1', 9],
      'ETH_TRI-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
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
  GSDETHTRILPPool: {
    name: 'Earn GSD by ETH-TRI LP (3x)',
    contract: 'GSDETHTRILPPool',
    depositTokenName: 'ETH_TRI-UNI-LPv2',
    earnTokenName: 'GSD',
    finished: false,
    sort: 1,
  },
  GSDUSDxPool: {
    name: 'Earn GSD by USDx',
    contract: 'GSDUSDxPool',
    depositTokenName: 'USDx',
    earnTokenName: 'GSD',
    finished: false,
    sort: 2,
  },
  GSDDAIPool: {
    name: 'Earn GSD by DAI',
    contract: 'GSDDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'GSD',
    finished: false,
    sort: 3,
  },
  GSDDAILPTokenSharePool: {
    name: 'Earn GSS by GSD-DAI-LP',
    contract: 'GSDDAILPTokenSharePool',
    depositTokenName: 'GSD_DAI-UNI-LPv2',
    earnTokenName: 'GSS',
    finished: false,
    sort: 4,
  },
  GSSDAILPTokenSharePool: {
    name: 'Earn GSS by GSS-DAI-LP',
    contract: 'GSSDAILPTokenSharePool',
    depositTokenName: 'GSS_DAI-UNI-LPv2',
    earnTokenName: 'GSS',
    finished: false,
    sort: 5,
  },
};

// export default configurations[process.env.NODE_ENV];
export default configurations.development;
