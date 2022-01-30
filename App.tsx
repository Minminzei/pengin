import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { RecoilRoot } from 'recoil';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Navigation colorScheme={colorScheme} />
          </SafeAreaView>
        </SafeAreaProvider>
      </RecoilRoot>
    );
  }
}
