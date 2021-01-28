import { useCallback, useEffect, useState } from 'react';
import useGnosticDollar from '../useGnosticDollar';
import { TokenStat } from '../../gnostic-dollar/types';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const gnosticDollar = useGnosticDollar();

  const fetchBondPrice = useCallback(async () => {
    setStat(await gnosticDollar.getBondStat());
  }, [gnosticDollar]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch GSB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, 10000);
    return () => clearInterval(refreshInterval);
  }, [setStat, gnosticDollar]);

  return stat;
};

export default useBondStats;