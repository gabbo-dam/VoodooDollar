import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(voodooDollar.harvestDollarFromBoardroom(), 'Claim VDD from Boardroom');
  }, [voodooDollar]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
