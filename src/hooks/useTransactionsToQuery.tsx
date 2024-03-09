import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';

export const useTransactionsToQuery = (address: string | undefined) => {
  return useQuery({
    queryKey: [QUERY.TRANSACTIONS_TO],
    enabled: !!address,
    queryFn: async () => {
      return await AlchemyHelper.getTransfersTo({address});
    },
  });
};
