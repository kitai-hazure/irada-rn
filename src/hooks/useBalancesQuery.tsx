import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';

export const useBalancesQuery = (address: string | undefined) => {
  return useQuery({
    queryKey: [QUERY.BALANCES],
    staleTime: Infinity,
    enabled: !!address,
    queryFn: async () => {
      return await AlchemyHelper.getBalances({address});
    },
  });
};
