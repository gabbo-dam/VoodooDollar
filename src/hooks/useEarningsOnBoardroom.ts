import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useVoodooDollar from './useVoodooDollar';

const useEarningsOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const voodooDollar = useVoodooDollar();

  const fetchBalance = useCallback(async () => {
    setBalance(await voodooDollar.getEarningsOnBoardroom());
  }, [voodooDollar?.isUnlocked]);

  useEffect(() => {
    if (voodooDollar?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshBalance);
    }
  }, [voodooDollar?.isUnlocked, setBalance]);

  return balance;
};

export default useEarningsOnBoardroom;
