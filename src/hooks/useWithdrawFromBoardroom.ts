import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import { Bank } from '../gnostic-dollar';
import { useTransactionAdder } from '../state/transactions/hooks';
import { BigNumber } from 'ethers';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        gnosticDollar.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} GSS from the boardroom`,
      );
    },
    [gnosticDollar],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
