import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import { Bank } from '../gnostic-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStake = (bank: Bank) => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        gnosticDollar.stake(bank.contract, amount, bank.depositToken.decimal),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, gnosticDollar],
  );
  return { onStake: handleStake };
};

export default useStake;
