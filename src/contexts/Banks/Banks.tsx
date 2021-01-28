import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useGnosticDollar from '../../hooks/useGnosticDollar';
import { Bank } from '../../gnostic-dollar';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const gnosticDollar = useGnosticDollar();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!gnosticDollar.isUnlocked) continue;

        // only show pools staked by user
        const balance = await gnosticDollar.stakedBalanceOnBank(bankInfo.contract, gnosticDollar.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: gnosticDollar.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName == 'GSD' ? gnosticDollar.GSD : gnosticDollar.GSS,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [gnosticDollar, setBanks]);

  useEffect(() => {
    if (gnosticDollar) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [gnosticDollar, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
