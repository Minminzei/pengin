import { ExpoConfig, ConfigContext } from '@expo/config';
import Colors from './constants/Colors';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: 'pengin',
    description: 'recoil demo project',
    slug: 'pengin',
    scheme: 'pengin',
    privacy: 'unlisted',
    platforms: ['ios', 'android', 'web'],
    version: config.version,
    primaryColor: Colors.primary,
    splash: {
      backgroundColor: Colors.white1,
      resizeMode: 'contain',
      image: './assets/images/splash.jpg',
    },
    extra: {
      ENV: process.env.ENV || 'development',
      API_SERVER: 'http://localhost:3100/',
    },
    android: {
      package: 'com.pengin',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.jpg',
        backgroundColor: Colors.primary,
      },
    },
    ios: {
      supportsTablet: true,
      icon: './assets/images/icon.jpg',
      bundleIdentifier: 'com.pengin',
    },
  };
};