import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import { Bank } from '../gnostic-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdraw = (bank: Bank) => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        gnosticDollar.unstake(bank.contract, amount),
        `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      );
    },
    [bank, gnosticDollar],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
