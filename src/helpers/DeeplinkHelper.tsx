export const DeeplinkHelper = {
  parseParams: (url: string) => {
    const params = url.split('?')[1];
    const pairs = params.split('&');
    const result: {[key: string]: string} = {};
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      result[key] = value;
    });
    return result;
  },
  isValidSendTokensLink: (url: string) => {
    if (url.startsWith('irada://send?')) {
      const params = DeeplinkHelper.parseParams(url);
      return params.to && params.amount && params.chain && params.currency;
    }
    return false;
  },
};
