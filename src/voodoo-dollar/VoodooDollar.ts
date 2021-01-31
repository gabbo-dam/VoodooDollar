import { Fetcher, Route, Token } from '@uniswap/sdk';
import { Configuration } from './config';
import { ContractName, TokenStat } from './types';
import { BigNumber, Contract, ethers } from 'ethers';
import { decimalToBalance, web3ProviderFrom } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';

/**
 * An API module of Voodoo Dollar contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class VoodooDollar {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };

  VDD: ERC20;
  VDS: ERC20;
  VDB: ERC20;

  constructor(cfg: Configuration) {
    const { defaultProvider, deployments, externalTokens } = cfg;
    const provider = new ethers.providers.Web3Provider(web3ProviderFrom(defaultProvider));

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal
    }
    this.VDD = new ERC20(deployments.Dollar.address, provider, 'VDD');
    this.VDS = new ERC20(deployments.Share.address, provider, 'VDS');
    this.VDB = new ERC20(deployments.Bond.address, provider, 'VDB');

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    this.provider = new ethers.providers.Web3Provider(provider);
    this.signer = this.provider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.VDD, this.VDS, this.VDB, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  async getDollarStat(): Promise<TokenStat> {
    const { Treasury } = this.contracts;
    const dollarPrice: BigNumber = await Treasury.getDollarPrice();
    return {
      priceInDAI: getDisplayBalance(dollarPrice),
      totalSupply: await this.VDD.displayedTotalSupply(),
    };
  }

  async getBondStat(): Promise<TokenStat> {
    const { Treasury } = this.contracts;
    const decimals = BigNumber.from(10).pow(18);

    const dollarPrice: BigNumber = await Treasury.getDollarPrice();
    const bondPrice = dollarPrice.div(decimals).pow(2).mul(decimals);
    return {
      priceInDAI: getDisplayBalance(bondPrice),
      totalSupply: await this.VDB.displayedTotalSupply(),
    };
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.VDS),
      totalSupply: await this.VDS.displayedTotalSupply(),
    };
  }

  async getTokenPriceFromUniswap(tokenContract: ERC20): Promise<string> {
    const { chainId } = this.config;
    const { DAI } = this.config.externalTokens;

    const dai = new Token(chainId, DAI[0], 18);
    const token = new Token(chainId, tokenContract.address, 18);

    try {
      const daiToToken = await Fetcher.fetchPairData(dai, token, this.provider);
      const priceInDAI = new Route([daiToToken], token);
      return priceInDAI.midPrice.toSignificant(3);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  /**
   * Buy bonds with dollar.
   * @param amount amount of dollar to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.buyBonds(decimalToBalance(amount));
  }

  /**
   * Redeem bonds for dollar.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.redeemBonds(decimalToBalance(amount));
  }

  async earnedFromBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens. (e.g. 1.45 DAI -> '1.45')
   * @returns {string} Transaction hash
   */
  async stake(poolName: ContractName, amount: string | number, decimals: string | number): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    return await pool.stake(BigNumber.from(`${Number(amount) * 10 ** Number(decimals)}`));
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens. (e.g. 1.45 DAI -> '1.45')
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, amount: string | number): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    return await pool.withdraw(decimalToBalance(amount));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    return await pool.getReward();
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    return await pool.exit();
  }

  async stakeShareToBoardroom(amount: string): Promise<TransactionResponse> {
    const { Boardroom } = this.contracts;
    return await Boardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    const { Boardroom } = this.contracts;
    return await Boardroom.getBoardSeatBalance();
  }

  async getEarningsOnBoardroom(): Promise<BigNumber> {
    const { Boardroom } = this.contracts;
    return await Boardroom.getDollarEarningsOf(this.myAccount);
  }

  async withdrawShareFromBoardroom(amount: string): Promise<TransactionResponse> {
    const { Boardroom } = this.contracts;
    return await Boardroom.withdraw(decimalToBalance(amount));
  }

  async harvestDollarFromBoardroom(): Promise<TransactionResponse> {
    const { Boardroom } = this.contracts;
    return await Boardroom.claimDividends();
  }

  async exitFromBoardroom(): Promise<TransactionResponse> {
    const { Boardroom } = this.contracts;
    return await Boardroom.exit();
  }
}
