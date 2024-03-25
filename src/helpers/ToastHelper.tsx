import Toast, {ToastShowParams} from 'react-native-toast-message';

export const ToastHelper = {
  show: (params: ToastShowParams) => {
    Toast.show(params);
  },
  hide: () => {
    Toast.hide();
  },
};
