import {wordlist} from '@metamask/scure-bip39/dist/wordlists/english';
import {
  entropyToMnemonic,
  generateMnemonic,
  mnemonicToEntropy,
  mnemonicToSeed,
  validateMnemonic,
} from '@metamask/scure-bip39';
import {Wallet} from 'ethers';
import {hdkey} from 'ethereumjs-wallet';

export const MnemonicHelper = {
  mnemonicToEntroy: (mnemonic: string) => {
    return mnemonicToEntropy(mnemonic, wordlist);
  },
  entropyToMnemonic: (uint8Array: Uint8Array) => {
    return entropyToMnemonic(uint8Array, wordlist);
  },
  generateMnemonic: async () => {
    const uint8Array = generateMnemonic(wordlist);
    const seed = MnemonicHelper.uint8ArrayToSeed(uint8Array);
    return {uint8Array, seed};
  },
  isValidMnemonic: (mnemonic: string | Uint8Array) => {
    return validateMnemonic(mnemonic, wordlist);
  },
  createWallet: async (mnemonic: string): Promise<Wallet> => {
    const seed = await mnemonicToSeed(mnemonic, wordlist);
    const hdNode = hdkey.fromMasterSeed(new Buffer(seed.buffer));
    const node = hdNode.derivePath("m/44'/60'/0'/0/0");
    return new Wallet(node.getWallet().getPrivateKey().toString('hex'));
  },
  uint8ArrayToSeed: (uint8Array: Uint8Array) => {
    if (uint8Array.length === 0) {
      throw new Error();
    }
    const indices = Array.from(
      new Uint16Array(new Uint8Array(uint8Array).buffer),
    );
    return indices.map(i => wordlist[i]).join(' ');
  },
};
