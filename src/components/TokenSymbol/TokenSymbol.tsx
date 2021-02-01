import React from 'react';

import vddLogo from '../../assets/img/basis-cash-logo.svg';
import vdsLogo from '../../assets/img/basis-share-logo.svg';
import vdbLogo from '../../assets/img/basis-bond-logo.svg';
import DAILogo from '../../assets/img/DAI.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';
import VoodooDollar from '../../icons/voodoodollar'
import VoodooShare from '../../icons/voodooshare'
import VoodooBond from '../../icons/voodoobond'

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
  symbol?: string;
  size?: number;
}

const TokenSymbol: React.FC<VoodooLogoProps> = ({ symbol, size = 64 }) => {
  // if (!logosBySymbol[symbol]) {
  //   throw new Error(`Invalid VoodooLogo symbol: ${symbol}`);
  // }

  if(symbol==='VoodooDollar'){
    return <VoodooDollar style={{width: '64', height: '64'}}/>
  } else if(symbol==='VoodooShare'){
    return <VoodooShare />
  } else if (symbol==='VoodooBond') {
    return <VoodooBond />
  } else if (symbol==='VoodooBond') {
    return <VoodooBond />
  } else if (symbol==='USDx') {
    return <img src="https://assets.coingecko.com/coins/images/12377/small/rCdP56C.png?1599445426" alt="USDx"/>
  } else if (symbol==='ETH_TRI-UNI-LPv2') {
    return <img src="https://assets.coingecko.com/coins/images/13379/small/trinity_logo.png?1608030983" alt="Trinity"/>
  }else {
    return (
      <img
        src={logosBySymbol[symbol]}
        alt={`${symbol} Logo`}
        width={size}
        height={size}
      />
    )
  }


};

export default TokenSymbol;
