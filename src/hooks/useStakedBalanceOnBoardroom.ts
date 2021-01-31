import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useVoodooDollar from './useVoodooDollar';

const useStakedBalanceOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const voodooDollar = useVoodooDollar();

  const fetchBalance = useCallback(async () => {
    setBalance(await voodooDollar.getStakedSharesOnBoardroom());
  }, [voodooDollar?.isUnlocked]);

  useEffect(() => {
    if (voodooDollar?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshBalance);
    }
  }, [voodooDollar?.isUnlocked, setBalance, voodooDollar]);

  return balance;
};

export default useStakedBalanceOnBoardroom;
