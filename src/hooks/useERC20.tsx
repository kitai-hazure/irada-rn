import {ethers} from 'ethers';
import {ABIS} from '../config';
import {useRef} from 'react';

export const useERC20 = () => {
  const contract = useRef<ethers.Contract>();

  const attachTo = (address: string, signer: ethers.Signer) => {
    if (contract.current) {
      contract.current.attach(address);
    } else {
      contract.current = new ethers.Contract(address, ABIS.ERC20, signer);
    }
  };

  return {attachTo, contract: contract.current};
};
