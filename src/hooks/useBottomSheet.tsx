import React, {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

interface SheetType<T> {
  InnerComponent?: (props: T) => JSX.Element;
  InnerComponentProps?: T;
}

interface UseBottomSheetProps {
  snapPoints: Array<string | number>;
}

export const useBottomSheet = ({snapPoints}: UseBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = async () => {
    bottomSheetRef.current?.expand();
    setTimeout(() => bottomSheetRef.current?.expand(), 500);
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const SheetComponent = ({
    InnerComponent,
    InnerComponentProps,
  }: SheetType<any>) => {
    return (
      <>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}>
          {InnerComponent && <InnerComponent {...InnerComponentProps} />}
        </BottomSheet>
      </>
    );
  };

  return {
    showSheet: handleOpen,
    hideSheet: handleClose,
    SheetComponent,
  };
};
