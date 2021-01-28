import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../gnostic-dollar';

const useHarvest = (bank: Bank) => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      gnosticDollar.harvest(bank.contract),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, gnosticDollar]);

  return { onReward: handleReward };
};

export default useHarvest;
