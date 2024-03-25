import {useQueryClient} from '@tanstack/react-query';
import {QUERY} from '../config';

export const useQueryInvalidator = () => {
  const queryClient = useQueryClient();

  const invalidateChainQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_TO]}),
      queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_FROM]}),
      queryClient.invalidateQueries({queryKey: [QUERY.TOKEN_HOLDINGS]}),
      queryClient.invalidateQueries({queryKey: [QUERY.NATIVE_BALANCE]}),
      queryClient.invalidateQueries({queryKey: [QUERY.BALANCES]}),
      queryClient.invalidateQueries({queryKey: [QUERY.GAS_PRICE]}),
    ]);
  };

  const invalidateAccountQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_TO]}),
      queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_FROM]}),
      queryClient.invalidateQueries({queryKey: [QUERY.TOKEN_HOLDINGS]}),
      queryClient.invalidateQueries({queryKey: [QUERY.NATIVE_BALANCE]}),
      queryClient.invalidateQueries({queryKey: [QUERY.BALANCES]}),
    ]);
  };

  return {
    invalidateChainQueries,
    invalidateAccountQueries,
  };
};
