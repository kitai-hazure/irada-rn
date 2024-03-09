import React, {useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Theme} from '../../config';
import {useThemedStyles, useWallet} from '../../hooks';
import {SvgUri} from 'react-native-svg';
import {ModalBottomButtons, WarningNote, ModalAddress} from '../walletconnect';
import {useSelector, useDispatch} from 'react-redux';
import {closeProposalModal, selectProposalModal} from '../../store';

export const SessionProposal = () => {
  const themedStyles = useThemedStyles(styles);
  const [imageLoadError, setImageLoadError] = useState(false);
  const {params, verifyContext, id} = useSelector(selectProposalModal);
  const dispatch = useDispatch();

  const {accept, reject} = useWallet();

  const handleApproveSession = async () => {
    if (id && params) {
      await accept(id, params);
      dispatch(closeProposalModal());
    }
  };

  const handleRejectSession = async () => {
    if (id) {
      await reject(id);
      dispatch(closeProposalModal());
    }
  };

  // const data = {
  //   id: 1709718140185332,
  //   params: {
  //     id: 1709718140185332,
  //     pairingTopic:
  //       'b6727ac188d8eafc7e221d179915175ee3ce094006d361e0318b6f8f0d10f953',
  //     expiryTimestamp: 1709718441,
  //     requiredNamespaces: {
  //       eip155: {
  //         chains: ['eip155:1'],
  //         methods: ['eth_sendTransaction', 'personal_sign'],
  //         events: ['chainChanged', 'accountsChanged'],
  //         rpcMap: {
  //           '1': 'https://mainnet.infura.io/v3/1afc24a3e4c443a0990d6e5efc2ecde5',
  //         },
  //       },
  //     },
  //     optionalNamespaces: {
  //       eip155: {
  //         chains: [
  //           'eip155:1',
  //           'eip155:137',
  //           'eip155:56',
  //           'eip155:42161',
  //           'eip155:1101',
  //         ],
  //         methods: [
  //           'eth_sendTransaction',
  //           'personal_sign',
  //           'eth_signTransaction',
  //           'eth_sign',
  //           'eth_signTypedData',
  //           'eth_signTypedData_v4',
  //         ],
  //         events: ['chainChanged', 'accountsChanged'],
  //         rpcMap: {
  //           '1': 'https://mainnet.infura.io/v3/1afc24a3e4c443a0990d6e5efc2ecde5',
  //           '56': 'https://bsc-dataseed.binance.org/',
  //           '137':
  //             'https://polygon-mainnet.infura.io/v3/1afc24a3e4c443a0990d6e5efc2ecde5',
  //           '1101': 'https://rpc.polygon-zkevm.gateway.fm',
  //           '42161':
  //             'https://arbitrum-mainnet.infura.io/v3/1afc24a3e4c443a0990d6e5efc2ecde5',
  //         },
  //       },
  //     },
  //     relays: [{protocol: 'irn'}],
  //     proposer: {
  //       publicKey:
  //         '67223205f1d66e43de9ea2a01a1b6995dd9ab75925af644ab289d8acccf0365b',
  //       metadata: {
  //         name: 'Push (EPNS)  App',
  //         description: 'The Communication Protocol of Web3',
  //         url: 'https://app.push.org',
  //         icons: [
  //           '/static/media/PushBlocknativeLogo.04b115a4c0b42bef077b2bc69647b1e0.svg',
  //           '/static/media/PushBlocknativeLogo.04b115a4c0b42bef077b2bc69647b1e0.svg',
  //         ],
  //       },
  //     },
  //   },
  //   verifyContext: {
  //     verified: {
  //       verifyUrl: 'https://verify.walletconnect.com',
  //       validation: 'VALID',
  //       origin: 'https://app.push.org',
  //     },
  //   },
  // };
  // const params = data.params;
  // const id = data.id;
  // const verifyContext = data.verifyContext;

  const imageUri = params?.proposer.metadata.icons[0];

  const handleOpenLink = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={themedStyles.container}>
      <View
        style={[
          themedStyles.iconContainer,
          imageLoadError && themedStyles.loadError,
        ]}>
        {!imageUri || imageLoadError ? (
          <Text style={themedStyles.textIcon}>
            {params?.proposer.metadata.name.charAt(0).toUpperCase()}
          </Text>
        ) : (
          <>
            {imageUri.endsWith('.svg') ? (
              <SvgUri
                uri={imageUri}
                width={40}
                height={40}
                onError={() => setImageLoadError(true)}
              />
            ) : (
              <Image
                source={{uri: imageUri}}
                style={themedStyles.icon}
                onError={() => setImageLoadError(true)}
              />
            )}
          </>
        )}
      </View>
      <Text style={themedStyles.title} ellipsizeMode="tail" numberOfLines={1}>
        Connect to {params?.proposer.metadata.name}?
      </Text>
      <Text style={themedStyles.description} numberOfLines={3}>
        {params?.proposer.metadata.description}
      </Text>
      <TouchableOpacity
        style={themedStyles.originButton}
        onPress={() => handleOpenLink(params?.proposer.metadata.url)}>
        <Text style={themedStyles.origin}>{params?.proposer.metadata.url}</Text>
      </TouchableOpacity>
      <Text style={themedStyles.warning}>
        This app is seeking a connection with your account. Proceed with
        awareness and ensure the legitimacy of the app before granting access
      </Text>
      <ModalAddress />
      <WarningNote verifyContext={verifyContext} />
      <ModalBottomButtons
        handleApprove={handleApproveSession}
        handleReject={handleRejectSession}
      />
    </View>
  );
};

export default SessionProposal;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginVertical: 32,
    },
    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
    },
    description: {
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 16,
      marginVertical: 4,
    },
    icon: {
      width: 40,
      height: 40,
      flex: 1,
      aspectRatio: 1,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 10,
      width: 50,
      height: 50,
      borderRadius: 10,
      overflow: 'hidden',
    },
    loadError: {
      borderWidth: 1,
      borderColor: theme.lightText,
      backgroundColor: theme.container,
      borderRadius: 10,
    },
    textIcon: {
      color: theme.text,
      fontSize: 28,
      fontWeight: 'bold',
    },
    warning: {
      color: theme.lightText,
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 8,
      marginVertical: 12,
    },
    originButton: {
      alignSelf: 'center',
    },
    origin: {
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
  });
