import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';

export const useGasPriceQuery = () => {
  return useQuery({
    queryKey: [QUERY.GAS_PRICE],
    queryFn: async () => {
      return await AlchemyHelper.getGasPrice();
    },
  });
};
