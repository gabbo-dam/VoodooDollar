import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = () => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(gnosticDollar.exitFromBoardroom(), 'Redeem GSS from Boardroom');
  }, [gnosticDollar]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
