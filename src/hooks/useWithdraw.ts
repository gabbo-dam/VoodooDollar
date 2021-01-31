import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import { Bank } from '../voodoo-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdraw = (bank: Bank) => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        voodooDollar.unstake(bank.contract, amount),
        `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      );
    },
    [bank, voodooDollar],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
