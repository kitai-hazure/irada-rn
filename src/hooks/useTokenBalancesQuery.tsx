import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';

export const useTokenBalancesQuery = (address: string | undefined) => {
  return useQuery({
    queryKey: [QUERY.TOKEN_HOLDINGS],
    enabled: !!address,
    staleTime: Infinity,
    queryFn: async () => {
      return await AlchemyHelper.getTokenBalances({address});
    },
  });
};
