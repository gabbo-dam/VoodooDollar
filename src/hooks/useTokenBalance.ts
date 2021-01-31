import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../voodoo-dollar/ERC20';
import useVoodooDollar from './useVoodooDollar';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const voodooDollar = useVoodooDollar();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(voodooDollar.myAccount));
  }, [voodooDollar?.isUnlocked, token]);

  useEffect(() => {
    if (voodooDollar?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [voodooDollar?.isUnlocked, token]);

  return balance;
};

export default useTokenBalance;
