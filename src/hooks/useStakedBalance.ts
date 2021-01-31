import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useVoodooDollar from './useVoodooDollar';
import { ContractName } from '../voodoo-dollar';

const useStakedBalance = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const voodooDollar = useVoodooDollar();

  const fetchBalance = useCallback(async () => {
    const balance = await voodooDollar.stakedBalanceOnBank(poolName, voodooDollar.myAccount);
    setBalance(balance);
  }, [voodooDollar?.isUnlocked, poolName]);

  useEffect(() => {
    if (voodooDollar?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshBalance);
    }
  }, [voodooDollar?.isUnlocked, poolName, setBalance, voodooDollar]);

  return balance;
};

export default useStakedBalance;
