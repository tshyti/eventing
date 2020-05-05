/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { loadAsync } from 'expo-font';
import AppNavigator from './src/navigators/AppNavigator';
import { AppLoading } from 'expo';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  async function loadFonts() {
    await loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  if (!isReady) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />;
  }

  return <AppNavigator />;
}
