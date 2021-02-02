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
  'ETH_PROPHET-UNI-LPv2': USDCLogo,
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

  if(symbol==='VoodooDollar' || symbol==='VDD' || symbol==='VDD_DAI-UNI-LPv2'){
    return <VoodooDollar style={{width: '64', height: '64'}}/>
  } else if(symbol==='VoodooShare'  || symbol==='VDS_DAI-UNI-LPv2' || symbol==='VDS' ){
    return <VoodooShare />
  } else if (symbol==='VoodooBond' || symbol==='VDB') {
    return <VoodooBond />
  } else if (symbol==='VoodooBond') {
    return <VoodooBond />
  } else if (symbol==='ETH_PROPHET-UNI-LPv2') {
    return <img width={64} height={64} src="https://assets.coingecko.com/coins/images/12377/small/rCdP56C.png?1599445426" alt="PROPHET"/>
  } else if (symbol==='ETH_TRI-UNI-LPv2') {
    return <img width={64} height={64} src="https://assets.coingecko.com/coins/images/13379/small/trinity_logo.png?1608030983" alt="Trinity"/>
  }else {
    return (
      <img
        src={logosBySymbol[symbol]}
        alt={`${symbol} Logo`}
        width={64}
        height={64}
      />
    )
  }


};

export default TokenSymbol;
