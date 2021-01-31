import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = () => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(voodooDollar.exitFromBoardroom(), 'Redeem VDS from Boardroom');
  }, [voodooDollar]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
