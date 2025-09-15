import {StyleSheet, View} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils/validation';
import {TextInput} from 'react-native-gesture-handler';
import {useRef} from 'react';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants/message';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

const SignupScreen = () => {
  const {signupMutation} = useAuth();
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });
  const handleSubmit = () => {
    const {email, password} = signup.values;
    console.log('try');
    signupMutation.mutate(
      {email, password},
      {
        onError: error => {
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          });
        },
      },
    );
  };
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          submitBehavior="submit"
          inputMode="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={signup.touched.email}
          error={signup.errors.email}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          secureTextEntry
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          touched={signup.touched.password}
          error={signup.errors.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          secureTextEntry
          onSubmitEditing={handleSubmit}
          returnKeyType="join"
          touched={signup.touched.passwordConfirm}
          error={signup.errors.passwordConfirm}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default SignupScreen;

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
