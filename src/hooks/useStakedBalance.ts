import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useGnosticDollar from './useGnosticDollar';
import { ContractName } from '../gnostic-dollar';

const useStakedBalance = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gnosticDollar = useGnosticDollar();

  const fetchBalance = useCallback(async () => {
    const balance = await gnosticDollar.stakedBalanceOnBank(poolName, gnosticDollar.myAccount);
    setBalance(balance);
  }, [gnosticDollar?.isUnlocked, poolName]);

  useEffect(() => {
    if (gnosticDollar?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshBalance);
    }
  }, [gnosticDollar?.isUnlocked, poolName, setBalance, gnosticDollar]);

  return balance;
};

export default useStakedBalance;
