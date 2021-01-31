import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../voodoo-dollar';

const useHarvest = (bank: Bank) => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      voodooDollar.harvest(bank.contract),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, voodooDollar]);

  return { onReward: handleReward };
};

export default useHarvest;
