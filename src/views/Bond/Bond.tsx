import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useBasisCash from '../../hooks/useBasisCash';
import { useTransactionAdder } from '../../state/transactions/hooks';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
import ExchangeStat from './components/ExchangeStat';
import useCashStatsFromTreasury from '../../hooks/useCashStatsFromTreasury';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashStat = useCashStatsFromTreasury();

  const bondBalance = useTokenBalance(basisCash?.GSB);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.buyBonds(amount);
      const bondAmount = Number(amount) / Number(cashStat.priceInDAI);
      addTransaction(tx, {
        summary: `Buy ${bondAmount.toFixed(2)} GSB with ${amount} GSD`,
      });
    },
    [basisCash, addTransaction, cashStat],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} GSB` });
    },
    [basisCash, addTransaction],
  );
  const cashIsOverpriced = useMemo(() => Number(cashStat?.priceInDAI) > 1.0, [cashStat]);
  const cashIsUnderPriced = useMemo(() => Number(cashStat?.priceInDAI) < 1.0, [cashStat]);

  const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={'🏦'}
            title="Buy & Redeem Bonds"
            subtitle="Earn premiums upon redemption"
          />
          <LaunchCountdown
            deadline={config.bondLaunchesAt}
            description="How does Basis bond work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism"
          />
        </Page>
      </Switch>
    );
  }
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={'🏦'}
                title="Buy & Redeem Bonds"
                subtitle="Earn premiums upon redemption"
              />
            </Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={basisCash.GSD}
                  fromTokenName="Gnostic Dollar"
                  toToken={basisCash.GSB}
                  toTokenName="Gnostic Bond"
                  priceDesc={
                    cashIsOverpriced
                      ? 'GSD is over $1'
                      : bondStat
                      ? `${Math.floor((100 / Number(bondStat.priceInDAI)) - 100)}% return when GSD > $1`
                      : '-'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || cashIsOverpriced}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="GSD"
                  description="Current Price (TWAP)"
                  price={cashStat?.priceInDAI || '-'}
                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="GSB"
                  description="Current Price (GSD)^2"
                  price={bondStat?.priceInDAI || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={basisCash.GSB}
                  fromTokenName="Gnostic Bond"
                  toToken={basisCash.GSD}
                  toTokenName="Gnostic Dollar"
                  priceDesc={`${getDisplayBalance(bondBalance)} GSB Available`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || cashIsUnderPriced}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button onClick={() => connect('injected')} text="Unlock Wallet" />
          </div>
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }

`;

export default Bond;
