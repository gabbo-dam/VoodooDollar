import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'https://rinkeby.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    deployments: require('./basis-cash/deployments/deployments.rinkeby.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      TRI: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      PROPHET: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      ETH_TRILP: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      'GSD_DAI-UNI-LPv2': ['0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD', 18],
      'GSS_DAI-UNI-LPv2': ['0x0379dA7a5895D13037B6937b109fA8607a659ADF', 18],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    treasuryAllocationDelayInSec: 86400,
    // TODO: it should be calculated by subtracting GSD supplies in the Treasury and Boardroom
    circSupply: '50001',
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      TRI: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 9],
      PROPHET: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      ETH_TRILP: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      'GSD_DAI-UNI-LPv2': ['0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD', 18],
      'GSS_DAI-UNI-LPv2': ['0x0379dA7a5895D13037B6937b109fA8607a659ADF', 18],
    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
    treasuryAllocationDelayInSec: 6 * 86400,
    // TODO: it should be calculated by subtracting GSD supplies in the Treasury and Boardroom
    circSupply: '50001',
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  GSDDAIPool: {
    name: 'Earn GSD by DAI',
    contract: 'GSDDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'GSD',
    finished: true,
    sort: 1,
  },
  GSDETH_TRILPPool: {
    name: 'Earn GSD by ETH_TRILP',
    contract: 'GSDETH_TRILPPool',
    depositTokenName: 'ETH_TRILP',
    earnTokenName: 'GSD',
    finished: true,
    sort: 2,
  },
  GSDPROPHETPool: {
    name: 'Earn GSD by PROPHET',
    contract: 'GSDPROPHETPool',
    depositTokenName: 'PROPHET',
    earnTokenName: 'GSD',
    finished: true,
    sort: 3,
  },
  GSDTRIPool: {
    name: 'Earn GSD by TRI',
    contract: 'GSDTRIPool',
    depositTokenName: 'TRI',
    earnTokenName: 'GSD',
    finished: true,
    sort: 5,
  },
  GSDDAILPTokenSharePool: {
    name: 'Earn GSS by GSD-DAI-LP',
    contract: 'GSDDAILPTokenSharePool',
    depositTokenName: 'GSD_DAI-UNI-LPv2',
    earnTokenName: 'GSS',
    finished: false,
    sort: 6,
  },
  GSSDAILPTokenSharePool: {
    name: 'Earn GSS by GSS-DAI-LP',
    contract: 'GSSDAILPTokenSharePool',
    depositTokenName: 'GSS_DAI-UNI-LPv2',
    earnTokenName: 'GSS',
    finished: false,
    sort: 7,
  },
};

export default configurations[process.env.NODE_ENV || "development"];
