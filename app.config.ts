import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: 'pengin',
    description: 'recoil demo project',
    slug: 'pengin',
    scheme: 'pengin',
    privacy: 'unlisted',
    platforms: ['ios', 'android', 'web'],
    version: config.version,
    primaryColor: '#f18b29',
    splash: {
      backgroundColor: '#ffffff',
      resizeMode: 'contain',
      image: './src/assets/images/splash.png',
    },
    extra: {
      ENV: process.env.ENV || 'development',
      API_SERVER: 'http://localhost:3100/',
    },
    android: {
      package: 'com.pengin',
      adaptiveIcon: {
        foregroundImage: './src/assets/images/icon.png',
        backgroundColor: '#f18b29',
      },
    },
    ios: {
      supportsTablet: true,
      icon: './src/assets/images/icon.png',
      bundleIdentifier: 'com.pengin',
    },
  };
};