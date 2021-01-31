import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        voodooDollar.stakeShareToBoardroom(amount),
        `Stake ${amount} VDS to the boardroom`,
      );
    },
    [voodooDollar],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
