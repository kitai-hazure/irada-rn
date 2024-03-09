export const AddressHelper = {
  formatAddress: (address: string, chars = 4) => {
    return `${address.substring(0, chars + 2)}...${address.substring(
      address.length - chars,
      address.length,
    )}`;
  },
};
