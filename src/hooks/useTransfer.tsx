import {ethers} from 'ethers';
import {useERC20} from './useERC20';
import {useAccount} from './useAccount';
import {CurrencyDropdownType} from '../components';
import {CONSTANTS} from '../config';
import {Contact} from 'expo-contacts';
import {useSelector} from 'react-redux';
import {selectContactMap} from '../store';
import {ToastHelper} from '../helpers';

type TransferOptions = {
  to: Contact;
  amount: string;
  currency: CurrencyDropdownType;
  gasLimit: ethers.BigNumberish;
};

export const useTransfer = () => {
  const {attachTo, contract} = useERC20();
  const {signer} = useAccount();
  const contactMap = useSelector(selectContactMap);

  const transfer = async ({
    to,
    amount,
    currency,
    gasLimit,
  }: TransferOptions) => {
    if (!signer) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'No signer found',
      });
      return;
    }
    try {
      if (to.id && contactMap[to.id]?.address) {
        const receiverAddress = contactMap[to.id].address;
        if (currency.address === CONSTANTS.ZERO_ADDRESS) {
          const tx = await signer.sendTransaction({
            to: receiverAddress,
            value: ethers.utils.parseEther(amount),
            gasLimit: gasLimit,
          });
          await tx.wait();
          ToastHelper.show({
            type: 'success',
            autoHide: true,
            text1: 'Success',
            text2: 'Transfer successful',
          });
        } else {
          attachTo(currency.address, signer);
          const tx = await contract?.transfer(
            to,
            ethers.utils.parseUnits(amount),
          );
          await tx?.wait();
          ToastHelper.show({
            type: 'success',
            autoHide: true,
            text1: 'Success',
            text2: 'Transfer successful',
          });
        }
      }
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to transfer',
      });
    }
  };

  return {transfer};
};
