import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import { Bank } from '../voodoo-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStake = (bank: Bank) => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        voodooDollar.stake(bank.contract, amount, bank.depositToken.decimal),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, voodooDollar],
  );
  return { onStake: handleStake };
};

export default useStake;
