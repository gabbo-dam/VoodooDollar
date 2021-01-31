import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import VoodooDollar from '../../voodoo-dollar';
import config from '../../config';

export interface VoodooDollarContext {
  voodooDollar?: VoodooDollar;
}

export const Context = createContext<VoodooDollarContext>({ voodooDollar: null });

export const VoodooDollarProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [voodooDollar, setVoodooDollar] = useState<VoodooDollar>();

  useEffect(() => {
    if (!voodooDollar) {
      const voodoo = new VoodooDollar(config);
      if (account) {
        // wallet was unlocked at initialization
        voodoo.unlockWallet(ethereum, account);
      }
      setVoodooDollar(voodoo);
    } else if (account) {
      voodooDollar.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ voodooDollar: voodooDollar }}>{children}</Context.Provider>;
};
