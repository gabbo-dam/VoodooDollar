import { useCallback, useEffect, useState } from 'react';
import useVoodooDollar from '../useVoodooDollar';
import { TokenStat } from '../../voodoo-dollar/types';

const useDollarStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const voodooDollar = useVoodooDollar();

  const fetchDollarPrice = useCallback(async () => {
    setStat(await voodooDollar.getDollarStat());
  }, [voodooDollar]);

  useEffect(() => {
    fetchDollarPrice().catch((err) => console.error(`Failed to fetch VDB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchDollarPrice, 10000);
    return () => clearInterval(refreshInterval);
  }, [setStat, voodooDollar]);

  return stat;
};

export default useDollarStats;
