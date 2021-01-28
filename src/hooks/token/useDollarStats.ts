import { useCallback, useEffect, useState } from 'react';
import useGnosticDollar from '../useGnosticDollar';
import { TokenStat } from '../../gnostic-dollar/types';

const useDollarStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const gnosticDollar = useGnosticDollar();

  const fetchDollarPrice = useCallback(async () => {
    setStat(await gnosticDollar.getDollarStat());
  }, [gnosticDollar]);

  useEffect(() => {
    fetchDollarPrice().catch((err) => console.error(`Failed to fetch GSB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchDollarPrice, 10000);
    return () => clearInterval(refreshInterval);
  }, [setStat, gnosticDollar]);

  return stat;
};

export default useDollarStats;
