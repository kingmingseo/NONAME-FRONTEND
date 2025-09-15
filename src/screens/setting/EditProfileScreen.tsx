import {Image, Keyboard, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import useImagePicker from '@/hooks/useImagePicker';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateEditProfile} from '@/utils/validation';
import InputField from '@/components/common/InputField';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {getBaseURL} from '@/api/axios';
import useModal from '@/hooks/useModal';
import EditProfileActionSheet from '@/components/setting/EditProfileActionSheet';
import Toast from 'react-native-toast-message';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

const EditProfileScreen = () => {
  const {auth, profileMutation} = useAuth();
  const imageAction = useModal();
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  const imagePicker = useImagePicker({
    initialImages: auth.imageUri ? [{uri: auth.imageUri}] : [],
    mode: 'single',
    onSettled: imageAction.hide,
  });
  const editProfile = useForm({
    initialValue: {
      nickname: auth.nickname ?? '',
    },
    validate: validateEditProfile,
  });
  const handlePressImage = () => {
    imageAction.show();
    Keyboard.dismiss();
  };
  const handleSubmitHandler = () => {
    profileMutation.mutate(
      {
        ...editProfile.values,
        imageUri: imagePicker.imageUris[0]?.uri,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '프로필이 변경 되었습니다',
          });
        },
      },
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Pressable
            style={[styles.imageContainer, styles.emptyImage]}
            onPress={handlePressImage}>
            {imagePicker.imageUris.length === 0 ? (
              <Ionicons
                name="camera-outline"
                size={30}
                color={colors[theme].GRAY_500}
              />
            ) : (
              <Image
                source={{
                  uri: getBaseURL() + `/${imagePicker.imageUris[0].uri}`,
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>
        <InputField
          {...editProfile.getTextInputProps('nickname')}
          error={editProfile.errors.nickname}
          touched={editProfile.touched.nickname}
          placeholder="닉네임을 입력해주세요"
        />
        <FixedBottomCTA label="저장" onPress={handleSubmitHandler} />
        <EditProfileActionSheet
          isVisible={imageAction.isVisible}
          onChangeImage={imagePicker.handleChangeImage}
          hideAction={imageAction.hide}
        />
      </View>
    </>
  );
};

export default EditProfileScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    profileContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    emptyImage: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 50,
      borderWidth: 1,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
  });
