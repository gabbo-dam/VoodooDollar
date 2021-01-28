import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useGnosticDollar from './useGnosticDollar';

const useEarningsOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const gnosticDollar = useGnosticDollar();

  const fetchBalance = useCallback(async () => {
    setBalance(await gnosticDollar.getEarningsOnBoardroom());
  }, [gnosticDollar?.isUnlocked]);

  useEffect(() => {
    if (gnosticDollar?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshBalance);
    }
  }, [gnosticDollar?.isUnlocked, setBalance]);

  return balance;
};

export default useEarningsOnBoardroom;