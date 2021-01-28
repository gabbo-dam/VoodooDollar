import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(gnosticDollar.harvestDollarFromBoardroom(), 'Claim GSD from Boardroom');
  }, [gnosticDollar]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
