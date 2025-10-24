import { Platform } from 'react-native';
import AppScreenContainerIOS from './AppScreenContainer.ios';
import AppScreenContainerAndroid from './AppScreenContainer.android';

export default Platform.OS === 'ios' ? AppScreenContainerIOS : AppScreenContainerAndroid;