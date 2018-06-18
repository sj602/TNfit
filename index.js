import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer',
  ]);

AppRegistry.registerComponent('TNfit', () => App);
