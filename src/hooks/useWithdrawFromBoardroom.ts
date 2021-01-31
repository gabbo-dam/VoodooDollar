import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import { Bank } from '../voodoo-dollar';
import { useTransactionAdder } from '../state/transactions/hooks';
import { BigNumber } from 'ethers';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        voodooDollar.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} VDS from the boardroom`,
      );
    },
    [voodooDollar],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
