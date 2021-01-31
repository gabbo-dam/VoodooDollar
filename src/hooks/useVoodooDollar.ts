import { useContext } from 'react';
import { Context } from '../contexts/VoodooDollarProvider';

const useVoodooDollar = () => {
  const { voodooDollar: voodooDollar } = useContext(Context);
  return voodooDollar;
};

export default useVoodooDollar;
