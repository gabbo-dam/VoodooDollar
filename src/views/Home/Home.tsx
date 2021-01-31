import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useVoodooDollar from '../../hooks/useVoodooDollar';

const Home: React.FC = () => {
  const voodooDollar = useVoodooDollar();

  const [{ dollar, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [dollar, bond, share] = await Promise.all([
      voodooDollar.getDollarStat(),
      voodooDollar.getBondStat(),
      voodooDollar.getShareStat(),
    ]);
    setStats({ dollar, bond, share });
  }, [voodooDollar, setStats]);

  useEffect(() => {
    if (voodooDollar) {
      fetchStats()
        .catch(err => console.error(err.stack));
    }
  }, [voodooDollar]);

  const dollarAddr = useMemo(() => voodooDollar?.VDD.address, [voodooDollar]);
  const shareAddr = useMemo(() => voodooDollar?.VDS.address, [voodooDollar]);
  const bondAddr = useMemo(() => voodooDollar?.VDB.address, [voodooDollar]);

  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="Buy, sell, and provide liquidity for Voodoo Dollar and Voodoo Shares on Uniswap"
        title="Welcome to Voodoo Dollar!"
      />
      <Spacer />
      <CardWrapper>
        <HomeCard
          title={'Voodoo Dollar'}
          symbol="VDD"
          color="#EEA7ED"
          address={dollarAddr}
          stat={dollar}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'Voodoo Share'}
          symbol="VDS"
          color="#E83725"
          address={shareAddr}
          stat={share}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'Voodoo Bond'}
          symbol="VDB"
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