import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        gnosticDollar.stakeShareToBoardroom(amount),
        `Stake ${amount} GSS to the boardroom`,
      );
    },
    [gnosticDollar],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
