import {TimeUnit} from '@notifee/react-native';

export const FormatHelper = {
  formatAddress: (address: string, chars = 4) => {
    return `${address.substring(0, chars + 2)}...${address.substring(
      address.length - chars,
      address.length,
    )}`;
  },
  formatTimeUnitToTime: (unit: TimeUnit) => {
    switch (unit) {
      case TimeUnit.SECONDS:
        return 1000;
      case TimeUnit.MINUTES:
        return 1000 * 60;
      case TimeUnit.HOURS:
        return 1000 * 60 * 60;
      case TimeUnit.DAYS:
        return 1000 * 60 * 60 * 24;
    }
  },
};
