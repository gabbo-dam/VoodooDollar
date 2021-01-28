import React from 'react';

import bacLogo from '../../assets/img/basis-cash-logo.svg';
import basLogo from '../../assets/img/basis-share-logo.svg';
import babLogo from '../../assets/img/basis-bond-logo.svg';
import TRILogo from '../../assets/img/ycrv.png';
import DAILogo from '../../assets/img/DAI.png';
import PROPHETLogo from '../../assets/img/DAI.png';
import ETH_TRILPLogo from '../../assets/img/DAI.png';

const logosBySymbol: {[title: string]: string} = {
  'GSD': bacLogo,
  'GSB': babLogo,
  'GSS': basLogo,
  'TRI': TRILogo,
  'DAI': DAILogo,
  'PROPHET': PROPHETLogo,
  'ETH_TRILP': ETH_TRILPLogo,
  'GSD_DAI-UNI-LPv2': bacLogo,
  'GSS_DAI-UNI-LPv2': basLogo,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  )
};

export default TokenSymbol;
