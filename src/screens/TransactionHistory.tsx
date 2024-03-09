import {StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  DrawerLayout,
  Header,
  TransactionsFromList,
  TransactionsToList,
} from '../components';
import {useThemedStyles} from '../hooks';
import {Theme} from '../config';

const renderScene = SceneMap({
  from: TransactionsFromList,
  to: TransactionsToList,
});

export const TransactionHistory = () => {
  const layout = useWindowDimensions();
  const themedStyles = useThemedStyles(styles);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'to', title: 'Received'},
    {key: 'from', title: 'Sent'},
  ]);

  return (
    <DrawerLayout>
      <Header title="Transaction History" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={themedStyles.tabBarStyle}
            pressColor={themedStyles.theme.transparent}
            activeColor={themedStyles.theme.white}
            inactiveColor={themedStyles.theme.lightText}
            indicatorStyle={themedStyles.indicatorStyle}
          />
        )}
      />
    </DrawerLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.container,
    },
    tabBarStyle: {
      backgroundColor: theme.container,
      borderRadius: 16,
    },
    indicatorStyle: {
      backgroundColor: theme.transparent,
    },
  });
