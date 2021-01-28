import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import { Bank } from '../gnostic-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStake = (bank: Bank) => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      console.log('bank :>> ', bank);
      console.log('amount :>> ', amount);
      handleTransactionReceipt(
        gnosticDollar.stake(bank.contract, amount),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, gnosticDollar],
  );
  return { onStake: handleStake };
};

export default useStake;
