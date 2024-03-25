import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';

export const useTransactionsFromQuery = (address: string | undefined) => {
  return useQuery({
    queryKey: [QUERY.TRANSACTIONS_FROM],
    enabled: !!address,
    staleTime: Infinity,
    queryFn: async () => {
      return await AlchemyHelper.getTransfersFrom({address});
    },
  });
};
