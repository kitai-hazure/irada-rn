import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';

export const useTransactionsToQuery = (address: string | undefined) => {
  return useQuery({
    queryKey: [QUERY.TRANSACTIONS_TO],
    enabled: !!address,
    staleTime: Infinity,
    queryFn: async () => {
      return await AlchemyHelper.getTransfersTo({address});
    },
  });
};
