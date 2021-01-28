import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../gnostic-dollar/ERC20';
import useGnosticDollar from './useGnosticDollar';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gnosticDollar = useGnosticDollar();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(gnosticDollar.myAccount));
  }, [gnosticDollar?.isUnlocked, token]);

  useEffect(() => {
    if (gnosticDollar?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [gnosticDollar?.isUnlocked, token]);

  return balance;
};

export default useTokenBalance;
