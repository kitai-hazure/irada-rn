import {useState, useEffect, useRef} from 'react';
import {InteractionManager} from 'react-native';

export const useAfterInteractions = () => {
  const [areInteractionsComplete, setInteractionsComplete] = useState(false);

  const subscriptionRef = useRef<ReturnType<
    typeof InteractionManager.runAfterInteractions
  > | null>(null);

  useEffect(() => {
    subscriptionRef.current = InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
      subscriptionRef.current = null;
    });
    return () => {
      subscriptionRef.current?.cancel();
    };
  }, []);

  return {
    areInteractionsComplete,
  };
};
