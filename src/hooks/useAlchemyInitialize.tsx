import {useSelector} from 'react-redux';
import {selectCurrentChainId} from '../store';
import {useEffect} from 'react';
import {AlchemyHelper, ToastHelper} from '../helpers';

export const useAlchemyInitialize = () => {
  const currentChainId = useSelector(selectCurrentChainId);

  useEffect(() => {
    try {
      AlchemyHelper.init(currentChainId);
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to initialize Alchemy',
      });
    }
  }, [currentChainId]);
};
