import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { RecoilRoot } from 'recoil';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RecoilRoot>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Navigation colorScheme={colorScheme} />
            </SafeAreaView>
          </SafeAreaProvider>
        </RecoilRoot>
      </RelayEnvironmentProvider>
    );
  }
}
