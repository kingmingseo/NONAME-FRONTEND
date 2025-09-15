import queryClient from '@/api/queryClient';
import useThemeStorage from '@/hooks/useThemeStorage';
import RootNavigation from '@/navigations/RootNavigation';
import {QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import Toast, {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from 'react-native-toast-message';
const toastConfig: Record<
  string,
  (props: BaseToastProps) => React.ReactElement
> = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{fontSize: 16, fontWeight: '600'}}
      text2Style={{fontSize: 14, color: '#595959'}}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{fontSize: 16, fontWeight: '600'}}
      text2Style={{fontSize: 14}}
    />
  ),
};
const App = () => {
  const {theme} = useThemeStorage();

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    prepare().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <RootNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
};

export default App;
