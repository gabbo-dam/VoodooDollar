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
      'ETH_PROPHET-UNI-LPv2': ['0x22aDE3578c58BC4e932fc23fa7AebCf9406DBEac', 18],
      'ETH_TRI-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      'VDD_DAI-UNI-LPv2': ['0x19D9ec051f944Fc3C57338F80Da62De78C7cF2bc', 18],
      'VDS_DAI-UNI-LPv2': ['0xCc4fC5eEE4ae95cEd29d128095495bE8A6f3A34A', 18],
    },
    baseLaunchDate: new Date('2020-02-02T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-08T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-02T00:00:00Z'),
  },
  production: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./voodoo-dollar/deployments/deployments.rinkeby.json'),
    externalTokens: {
      'ETH_PROPHET-UNI-LPv2': ['0x22aDE3578c58BC4e932fc23fa7AebCf9406DBEac', 18],
      'ETH_TRI-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      'VDD_DAI-UNI-LPv2': ['0x19D9ec051f944Fc3C57338F80Da62De78C7cF2bc', 18],
      'VDS_DAI-UNI-LPv2': ['0xCc4fC5eEE4ae95cEd29d128095495bE8A6f3A34A', 18],
    },
    baseLaunchDate: new Date('2020-02-02T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-08T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-02T00:00:00Z'),
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  VDDETHTRILPPool: {
    name: 'Earn VDD by ETH-TRI LP (2x)',
    contract: 'VDDETHTRILPPool',
    depositTokenName: 'ETH_TRI-UNI-LPv2',
    earnTokenName: 'VDD',
    finished: false,
    sort: 1,
  },
  VDDETHPROPHETPool: {
    name: 'Earn VDD by ETH-PROPHET LP (2x)',
    contract: 'VDDETHPROPHETLPPool',
    depositTokenName: 'ETH_PROPHET-UNI-LPv2',
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
