import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Theme} from '../config';
import {useThemedStyles} from '../hooks';
import {ContactItemSmall, DrawerLayout} from '../components';

export const SavedContacts = () => {
  // const {savedContacts} = useContacts();
  const savedContacts: any = [];
  const themedStyles = useThemedStyles(styles);

  return (
    <DrawerLayout>
      <View style={themedStyles.container}>
        <FlatList
          numColumns={3}
          data={savedContacts}
          renderItem={({item}) => <ContactItemSmall contact={item} />}
          keyExtractor={item => `${item.id}-${item.name}`}
        />
      </View>
    </DrawerLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: 16,
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
    },
  });
