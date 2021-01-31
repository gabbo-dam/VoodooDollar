import ERC20 from './ERC20';

export type ContractName = string;

export interface BankInfo {
  name: string;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  finished: boolean;
  sort: number;
}

export interface Bank extends  BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type TokenStat = {
  priceInDAI: string;
  totalSupply: string;
};
