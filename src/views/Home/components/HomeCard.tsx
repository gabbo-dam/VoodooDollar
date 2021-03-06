import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../voodoo-dollar/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';


interface HomeCardProps {
  title: string;
  symbol: string;
  color: string;
  address: string;
  stat?: TokenStat;
  style?: string;
  background?: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, symbol, color, address,  stat, background }) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;
  return (
    <Wrapper>
      <StyledCards style={{ backgroundColor: background}}>
        <InnerMargin>
          <CardHeader>{title}</CardHeader>
          <TokenSymbol symbol={symbol} />
    
          <CardSection>
            {stat ? <StyledValue>${stat.priceInDAI}</StyledValue> : <ValueSkeleton />}
            <Label text="Current Price" color={color} />
          </CardSection>

          <CardSection>
            {stat ? <StyledValue>{commify(stat.totalSupply)}</StyledValue> : <ValueSkeleton />}
            <StyledSupplyLabel href={tokenUrl} color={color}>
              Total Supply
            </StyledSupplyLabel>
          </CardSection>
        </InnerMargin>
      </StyledCards>
    </Wrapper>
  );
};

const InnerMargin = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

const CardHeader = styled.h2`
  color: #fff;
  text-align: left;
`;

const StyledCards = styled.div`
  min-width: 337px;
  min-height: 305px;
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.grey[900]};
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledValue = styled.span`
  display: inline-block;
  font-size: 36px;
  color: #eeeeee;
`;

const CardSection = styled.div`
  // margin-bottom: ${(props) => props.theme.spacing[4]}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledSupplyLabel = styled.a`
  display: block;
  color: ${(props) => props.color};
`;

const ValueSkeleton = () => {
  const theme = useContext(ThemeContext);
  return (
    <SkeletonTheme color={theme.color.grey[700]} highlightColor={theme.color.grey[600]}>
      <ValueSkeletonPadding>
        <Skeleton height={10} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};

const GuideText = styled.span`
  color: ${(props) => props.theme.color.primary.main};
  font-size: 0.8rem;
`;

const ValueText = styled.p`
  color: ${(props) => props.theme.color.white};
  font-weight: bold;
  font-size: 1.25rem;
  margin: ${(props) => props.theme.spacing[1]}px 0;
`;

export default HomeCard;
