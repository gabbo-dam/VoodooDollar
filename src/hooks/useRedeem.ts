import { useCallback } from 'react';
import useGnosticDollar from './useGnosticDollar';
import { Bank } from '../gnostic-dollar';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const gnosticDollar = useGnosticDollar();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(gnosticDollar.exit(bank.contract), `Redeem ${bank.contract}`);
  }, [bank, gnosticDollar]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
