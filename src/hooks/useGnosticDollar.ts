import { useContext } from 'react';
import { Context } from '../contexts/GnosticDollarProvider';

const useGnosticDollar = () => {
  const { gnosticDollar: gnosticDollar } = useContext(Context);
  return gnosticDollar;
};

export default useGnosticDollar;
