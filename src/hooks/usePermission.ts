import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import alerts from '@/constants/message';
type PermissionType = 'LOCATION' | 'PHOTO';

const androidPermissions = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};



function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermissions
        : iosPermissions;

      const checked = await check(permissionOS[type]);
      console.log('[permission][check]', checked);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            { text: '설정하기', onPress: () => Linking.openSettings() },
            { text: '취소', style: 'cancel' },
          ]
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          showPermissionAlert();
          await request(permissionOS[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;

      }
    })();
  }, [type]);

}

export default usePermission;
