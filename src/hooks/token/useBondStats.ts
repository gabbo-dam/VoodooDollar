import { useCallback, useEffect, useState } from 'react';
import useVoodooDollar from '../useVoodooDollar';
import { TokenStat } from '../../voodoo-dollar/types';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const voodooDollar = useVoodooDollar();

  const fetchBondPrice = useCallback(async () => {
    setStat(await voodooDollar.getBondStat());
  }, [voodooDollar]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch VDB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, 10000);
    return () => clearInterval(refreshInterval);
  }, [setStat, voodooDollar]);

  return stat;
};

export default useBondStats;
