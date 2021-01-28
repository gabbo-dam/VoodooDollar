import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import GnosticDollar from '../../gnostic-dollar';
import config from '../../config';

export interface GnosticDollarContext {
  gnosticDollar?: GnosticDollar;
}

export const Context = createContext<GnosticDollarContext>({ gnosticDollar: null });

export const GnosticDollarProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [gnosticDollar, setGnosticDollar] = useState<GnosticDollar>();

  useEffect(() => {
    if (!gnosticDollar) {
      const gnostic = new GnosticDollar(config);
      if (account) {
        // wallet was unlocked at initialization
        gnostic.unlockWallet(ethereum, account);
      }
      setGnosticDollar(gnostic);
    } else if (account) {
      gnosticDollar.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ gnosticDollar: gnosticDollar }}>{children}</Context.Provider>;
};
