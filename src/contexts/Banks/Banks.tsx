import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useVoodooDollar from '../../hooks/useVoodooDollar';
import { Bank } from '../../voodoo-dollar';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const voodooDollar = useVoodooDollar();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!voodooDollar.isUnlocked) continue;

        // only show pools staked by user
        const balance = await voodooDollar.stakedBalanceOnBank(bankInfo.contract, voodooDollar.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: voodooDollar.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName == 'VDD' ? voodooDollar.VDD : voodooDollar.VDS,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [voodooDollar, setBanks]);

  useEffect(() => {
    if (voodooDollar) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [voodooDollar, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
