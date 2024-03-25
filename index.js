import './shim';
import 'react-native-crypto';
import 'react-native-get-random-values';
import 'text-encoding';
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NotifeeHelper} from './src/helpers';

NotifeeHelper.setupEventHandlers();

AppRegistry.registerComponent(appName, () => App);
