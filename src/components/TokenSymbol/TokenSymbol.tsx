import React from 'react';

import gsdLogo from '../../assets/img/basis-cash-logo.svg';
import gssLogo from '../../assets/img/basis-share-logo.svg';
import gsbLogo from '../../assets/img/basis-bond-logo.svg';
import DAILogo from '../../assets/img/DAI.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';

const logosBySymbol: {[title: string]: string} = {
  'GSD': gsdLogo,
  'GSB': gsbLogo,
  'GSS': gssLogo,
  'DAI': DAILogo,
  'TRI-ETH': sUSDLogo,
  'TRI': USDCLogo,
  'PROPHET': USDTLogo,
  'GSD_DAI-UNI-LPv2': gsdLogo,
  'GSS_DAI-UNI-LPv2': gssLogo,
};

type GnosticLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<GnosticLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid GnosticLogo symbol: ${symbol}`);
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
