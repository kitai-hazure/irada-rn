import {ethers} from 'ethers';
import {SupportedChains, SupportedCurrencies} from '../../types/chain';
import {useWallet} from './useWallet';
import {useERC20} from './useERC20';

type TransferOptions = {
  to: string;
  amount: string;
  chain: SupportedChains;
  currency: SupportedCurrencies;
};

export const useTransfer = () => {
  const {signer} = useWallet();
  const {attachTo, contract} = useERC20();

  const transfer = async ({to, amount, chain, currency}: TransferOptions) => {
    if (!signer) {
      console.error('No signer');
      // TODO: Send toast error
      return;
    }
    const address = '0x1234...5678'; // TODO: Get the address from the chain and currency
    // check if currency is a token or native
    // TODO: find a better way to check if currency is a token or native
    if (currency === 'ETH' || currency === 'MATIC') {
      const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
    } else {
      attachTo(address, signer);
      const tx = await contract?.transfer(to, ethers.utils.parseUnits(amount));
      await tx?.wait();
    }
  };
};
