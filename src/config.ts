import { ChainId } from '@uniswap/sdk';
import { Configuration } from './voodoo-dollar/config';
import { BankInfo } from './voodoo-dollar';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./voodoo-dollar/deployments/deployments.rinkeby.json'),
    externalTokens: {
      USDx: ['0x0a4612DE67DF29115a2E320aff6601C32D38B4C1', 9],
      'ETH_TRI-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      // TODO: replace with real address
      'VDD_DAI-UNI-LPv2': ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      'VDS_DAI-UNI-LPv2': ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
    },
    baseLaunchDate: new Date('2020-01-29T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-03T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-03T00:00:00Z'),
  },
  production: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./voodoo-dollar/deployments/deployments.rinkeby.json'),
    externalTokens: {
      USDx: ['0x0a4612DE67DF29115a2E320aff6601C32D38B4C1', 9],
      'ETH_TRI-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      // TODO: replace with real address
      'VDD_DAI-UNI-LPv2': ['0xab4bdfD59dbC4503A9cAE8c17433A3dc65235160', 18],
      'VDS_DAI-UNI-LPv2': ['0x65f3D49963638A8DCb2377fbdE17f1b790c94477', 18],
    },
    baseLaunchDate: new Date('2021-01-28T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-02T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-02T00:00:00Z'),
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  VDDETHTRILPPool: {
    name: 'Earn VDD by ETH-TRI LP (3x)',
    contract: 'VDDETHTRILPPool',
    depositTokenName: 'ETH_TRI-UNI-LPv2',
    earnTokenName: 'VDD',
    finished: false,
    sort: 1,
  },
  VDDUSDxPool: {
    name: 'Earn VDD by USDx',
    contract: 'VDDUSDxPool',
    depositTokenName: 'USDx',
    earnTokenName: 'VDD',
    finished: false,
    sort: 2,
  },
  VDDDAIPool: {
    name: 'Earn VDD by DAI',
    contract: 'VDDDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'VDD',
    finished: false,
    sort: 3,
  },
  VDDDAILPTokenSharePool: {
    name: 'Earn VDS by VDD-DAI-LP',
    contract: 'VDDDAILPTokenSharePool',
    depositTokenName: 'VDD_DAI-UNI-LPv2',
    earnTokenName: 'VDS',
    finished: false,
    sort: 4,
  },
  VDSDAILPTokenSharePool: {
    name: 'Earn VDS by VDS-DAI-LP',
    contract: 'VDSDAILPTokenSharePool',
    depositTokenName: 'VDS_DAI-UNI-LPv2',
    earnTokenName: 'VDS',
    finished: false,
    sort: 5,
  },
};

// export default configurations[process.env.NODE_ENV];
export default configurations.development;
