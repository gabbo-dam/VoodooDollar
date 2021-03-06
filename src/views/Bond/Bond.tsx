import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/token/useBondStats';
import useVoodooDollar from '../../hooks/useVoodooDollar';
import { useTransactionAdder } from '../../state/transactions/hooks';
import useDollarStats from '../../hooks/token/useDollarStats';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  const voodooDollar = useVoodooDollar();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const dollarStat = useDollarStats();

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await voodooDollar.buyBonds(amount);
      const bondAmount = Number(amount) / Number(dollarStat.priceInDAI);
      addTransaction(tx, {
        summary: `Buy ${bondAmount.toFixed(2)} VDB with ${amount} VDD`,
      });
    },
    [voodooDollar, addTransaction, dollarStat],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await voodooDollar.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} VDB` });
    },
    [voodooDollar, addTransaction],
  );
  const dollarIsOverpriced = useMemo(() => Number(dollarStat?.priceInDAI) > 1.0, [dollarStat]);
  const dollarIsUnderPriced = useMemo(() => Number(dollarStat?.priceInDAI) < 1.0, [dollarStat]);

  const isLaunched = Date.now() >= config.bondLaunchesAt;
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
            description="How does Voodoo bonds work?"
            descriptionLink="https://medium.com/voodoo-dollar#TODO"
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
                  fromToken={voodooDollar.VDD}
                  fromTokenName="Voodoo Dollar"
                  toToken={voodooDollar.VDB}
                  toTokenName="Voodoo Bond"
                  priceDesc={`VDB Price: ${!bondStat ? '-' : '$' + bondStat.priceInDAI}`}
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || dollarIsOverpriced}
                />
              </StyledCardWrapper>
              <Spacer size="lg" />
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={voodooDollar.VDB}
                  fromTokenName="Voodoo Bond"
                  toToken={voodooDollar.VDD}
                  toTokenName="Voodoo Dollar"
                  priceDesc="1 VDB = 1 VDD"
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || dollarIsUnderPriced}
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
  width: 600px;
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

export default Bond;
