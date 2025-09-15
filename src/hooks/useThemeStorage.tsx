import {storageKeys} from '@/constants/keys';
import useThemeStore, {Theme} from '@/store/theme';
import {getEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

function useThemeStorage() {
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();
  const systemTheme = useColorScheme();

  const setMode = async (mode: Theme) => {
    await setEncryptStorage(storageKeys.THEME_MODE, mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    await setEncryptStorage(storageKeys.THEME_SYSTEM, flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getEncryptStorage(storageKeys.THEME_MODE)) ?? 'light';
      const systemMode =
        (await getEncryptStorage(storageKeys.THEME_SYSTEM)) ?? false;

      const newMode = systemMode ? systemTheme : mode;
      setTheme(newMode as Theme);
      setSystemTheme(systemMode as boolean);
    })();
  }, [setTheme, setSystemTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;
