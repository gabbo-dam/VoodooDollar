import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useGnosticDollar from '../../hooks/useGnosticDollar';

const Home: React.FC = () => {
  const gnosticDollar = useGnosticDollar();

  const [{ dollar, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [dollar, bond, share] = await Promise.all([
      gnosticDollar.getDollarStat(),
      gnosticDollar.getBondStat(),
      gnosticDollar.getShareStat(),
    ]);
    setStats({ dollar, bond, share });
  }, [gnosticDollar, setStats]);

  useEffect(() => {
    if (gnosticDollar) {
      fetchStats()
        .catch(err => console.error(err.stack));
    }
  }, [gnosticDollar]);

  const dollarAddr = useMemo(() => gnosticDollar?.GSD.address, [gnosticDollar]);
  const shareAddr = useMemo(() => gnosticDollar?.GSS.address, [gnosticDollar]);
  const bondAddr = useMemo(() => gnosticDollar?.GSB.address, [gnosticDollar]);

  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="Buy, sell, and provide liquidity for Gnostic Dollar and Gnostic Shares on Uniswap"
        title="Welcome to Gnostic Dollar!"
      />
      <Spacer />
      <CardWrapper>
        <HomeCard
          title={'Gnostic Dollar'}
          symbol="GSD"
          color="#EEA7ED"
          address={dollarAddr}
          stat={dollar}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'Gnostic Share'}
          symbol="GSS"
          color="#E83725"
          address={shareAddr}
          stat={share}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'Gnostic Bond'}
          symbol="GSB"
          color="#ECF25C"
          address={bondAddr}
          stat={bond}
        />
      </CardWrapper>
    </Page>
  );
};

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;
const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${props => props.theme.color.primary.main};
`;

export default Home;