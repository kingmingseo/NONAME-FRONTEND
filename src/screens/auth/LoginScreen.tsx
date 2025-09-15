import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils/validation';
import {TextInput} from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants/message';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

const LoginScreen = () => {
  const {loginMutation} = useAuth();
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });
  const passwordRef = useRef<TextInput | null>(null);
  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
        });
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          touched={login.touched.email}
          error={login.errors.email}
          returnKeyType="next"
          inputMode="email"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          onSubmitEditing={handleSubmit}
          secureTextEntry
          returnKeyType="join"
          touched={login.touched.password}
          error={login.errors.password}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default LoginScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
      backgroundColor: colors[theme].WHITE,
    },
    inputContainer: {
      gap: 20,
      marginBottom: 30,
    },
  });
