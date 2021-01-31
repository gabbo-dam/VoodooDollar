import { useCallback } from 'react';
import useVoodooDollar from './useVoodooDollar';
import { Bank } from '../voodoo-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const voodooDollar = useVoodooDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(voodooDollar.exit(bank.contract), `Redeem ${bank.contract}`);
  }, [bank, voodooDollar]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
