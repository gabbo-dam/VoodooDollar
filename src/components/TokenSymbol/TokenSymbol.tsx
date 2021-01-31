import React from 'react';

import vddLogo from '../../assets/img/basis-cash-logo.svg';
import vdsLogo from '../../assets/img/basis-share-logo.svg';
import vdbLogo from '../../assets/img/basis-bond-logo.svg';
import DAILogo from '../../assets/img/DAI.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';

const logosBySymbol: {[title: string]: string} = {
  'VDD': vddLogo,
  'VDB': vdbLogo,
  'VDS': vdsLogo,
  'DAI': DAILogo,
  'ETH_TRI-UNI-LPv2': sUSDLogo,
  'USDx': USDCLogo,
  'VDD_DAI-UNI-LPv2': vddLogo,
  'VDS_DAI-UNI-LPv2': vdsLogo,
};

type VoodooLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<VoodooLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid VoodooLogo symbol: ${symbol}`);
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
