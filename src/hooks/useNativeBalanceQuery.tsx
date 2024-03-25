import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {AlchemyHelper} from '../helpers';
import {ethers} from 'ethers';

export const useNativeBalanceQuery = (address: string | undefined) => {
  return useQuery({
    queryKey: [QUERY.NATIVE_BALANCE],
    enabled: !!address,
    staleTime: Infinity,
    queryFn: async () => {
      const result = await AlchemyHelper.getNativeCurrencyBalance({address});
      if (result) {
        return ethers.utils.parseEther(
          ethers.utils.formatUnits(result, 'ether'),
        );
      } else {
        return undefined;
      }
    },
  });
};
