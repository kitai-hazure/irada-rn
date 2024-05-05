import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Theme} from '../config';
import {useSavedContacts, useThemedStyles} from '../hooks';
import {
  ContactItemSmall,
  DrawerLayout,
  Empty,
  Errored,
  Header,
  Loader,
} from '../components';

const SavedContactsScreen = () => {
  const {data: savedContacts, isError, isLoading} = useSavedContacts();
  const themedStyles = useThemedStyles(styles);

  if (isError) {
    return (
      <DrawerLayout>
        <Header title="Saved Contacts" />
        <Errored />
      </DrawerLayout>
    );
  } else if (isLoading || !savedContacts) {
    return (
      <DrawerLayout>
        <Header title="Saved Contacts" />
        <Loader />
      </DrawerLayout>
    );
  }

  return (
    <DrawerLayout>
      <Header title="Saved Contacts" />
      {savedContacts.length > 0 ? (
        <View style={themedStyles.container}>
          <FlatList
            columnWrapperStyle={themedStyles.columnWrapper}
            numColumns={3}
            data={savedContacts}
            renderItem={({item}) => <ContactItemSmall contact={item} />}
            keyExtractor={item => `${item.id}-${item.name}`}
          />
        </View>
      ) : (
        <Empty message="No saved contacts found" />
      )}
    </DrawerLayout>
  );
};

export const SavedContacts = React.memo(SavedContactsScreen);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      flex: 1,
      backgroundColor: theme.background,
    },
    columnWrapper: {
      justifyContent: 'space-around',
    },
  });
