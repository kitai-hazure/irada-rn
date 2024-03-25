import React, {useEffect, useState} from 'react';
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
import {buildApprovedNamespaces} from '@walletconnect/utils';
import type {SessionTypes} from '@walletconnect/types';
import {ToastHelper} from '../../helpers';

export const SessionProposal = () => {
  const themedStyles = useThemedStyles(styles);
  const [imageLoadError, setImageLoadError] = useState(false);
  const {params, verifyContext, id} = useSelector(selectProposalModal);
  const dispatch = useDispatch();
  const [namespaces, setNamespaces] = useState<SessionTypes.Namespaces>();

  const {accept, reject, getSupportedNamespaces} = useWallet();

  const handleApproveSession = async () => {
    try {
      if (id && namespaces) {
        await accept(id, namespaces);
        dispatch(closeProposalModal());
        ToastHelper.show({
          type: 'success',
          autoHide: true,
          text1: 'Success',
          text2: 'Session approved successfully',
        });
      }
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to approve session',
      });
    }
  };

  const handleRejectSession = async () => {
    try {
      if (id) {
        await reject(id);
        dispatch(closeProposalModal());
        ToastHelper.show({
          type: 'success',
          autoHide: true,
          text1: 'Success',
          text2: 'Session rejected successfully',
        });
      }
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to reject session',
      });
    }
  };

  const imageUri = params?.proposer.metadata.icons[0];

  const handleOpenLink = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  useEffect(() => {
    if (params) {
      try {
        const supportedNamespaces = getSupportedNamespaces();
        const ns = buildApprovedNamespaces({
          proposal: params,
          supportedNamespaces,
        });
        setNamespaces(ns);
      } catch (error) {
        console.error(
          'Error building approved namespaces, possibly chain not supported.',
          error,
        );
      }
    }
  }, [getSupportedNamespaces, params]);

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
