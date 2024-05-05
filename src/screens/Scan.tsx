import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../config';
import {useThemedStyles, useWallet} from '../hooks';
import {
  BarCodeScanningResult,
  Camera,
  CameraType,
  FlashMode,
} from 'expo-camera';
import {DrawerLayout, GestureButton, IradaButton, QRIcon} from '../components';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {ToastHelper} from '../helpers';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const sideWidths = (width - height / 3) / 2;

const ScanScreen = ({
  navigation,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'Scan'>) => {
  const themedStyles = useThemedStyles(styles);
  const [flashMode, setFlashMode] = useState(FlashMode.auto);
  const [facing, setFacing] = useState<CameraType>(CameraType.back);

  const {pair} = useWallet();

  const onBarCodeScanned = async (scanningResult: BarCodeScanningResult) => {
    try {
      if (!scanningResult.data.startsWith('wc:')) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: 'Invalid QR code',
        });
        return;
      }
      await pair(scanningResult.data);
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to pair wallet',
      });
    }
  };

  const handleCameraSwitch = async () => {
    setFacing(prev =>
      prev === CameraType.back ? CameraType.front : CameraType.back,
    );
  };

  const handleFlashSwitch = async () => {
    setFlashMode(prev => {
      switch (prev) {
        case FlashMode.torch:
          return FlashMode.off;
        default:
          return FlashMode.torch;
      }
    });
  };

  return (
    <DrawerLayout isPadded={false}>
      <Camera
        style={themedStyles.camera}
        type={facing}
        flashMode={flashMode}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={onBarCodeScanned}
      />
      <View style={themedStyles.flashIconContainer}>
        <GestureButton scale={1.2}>
          <IradaButton
            color="transparent"
            onPress={handleFlashSwitch}
            style={themedStyles.button}>
            <Entypo name="flashlight" size={24} color="white" />
          </IradaButton>
        </GestureButton>
      </View>
      <View style={themedStyles.cameraChangeIconContainer}>
        <GestureButton scale={1.2}>
          <IradaButton
            color="transparent"
            onPress={handleCameraSwitch}
            style={themedStyles.button}>
            <Ionicons name="camera-reverse" size={28} color="white" />
          </IradaButton>
        </GestureButton>
      </View>
      <View style={themedStyles.topBottomContainers} />
      <View style={themedStyles.centerContainer}>
        <View style={themedStyles.sideContainers} />
        <View style={themedStyles.qrContainer}>
          <QRIcon width={height / 3} height={height / 3} />
        </View>
        <View style={themedStyles.sideContainers} />
      </View>
      <View style={themedStyles.topBottomContainers} />
    </DrawerLayout>
  );
};

export const Scan = React.memo(ScanScreen);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      ...StyleSheet.absoluteFillObject,
    },
    flashIconContainer: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.purple,
      zIndex: 1,
    },
    cameraChangeIconContainer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.orange,
      zIndex: 1,
    },
    scanIconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: width / 2,
      height: height / 2,
      borderRadius: 25,
      alignSelf: 'center',
    },
    topBottomContainers: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      height: height / 3,
    },
    centerContainer: {
      width: width,
      display: 'flex',
      flexDirection: 'row',
    },
    sideContainers: {
      width: sideWidths,
      height: height / 3,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    qrContainer: {
      backgroundColor: theme.transparent,
      height: height / 3,
      width: height / 3,
    },
    button: {
      padding: 0,
    },
  });
