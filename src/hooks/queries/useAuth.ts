import {
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
  ResponseToken,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import {storageKeys, queryKeys} from '@/constants/keys';
import numbers from '@/constants/numbers';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/api';
import {Profile} from '@/types/domain';
import {
  removeEncryptedStorage,
  setEncryptStorage,
} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/header';
import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

//최초 로그인 시  헤더에 엑세스 토큰을 저장하고 EncryptStorage에 리프레쉬 토큰을 저장
function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
      }
    })();
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const logoutMutation = useLogout();
  const refreshTokenQuery = useGetRefreshToken();
  const {data, isSuccess: isLogin} = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const profileMutation = useUpdateProfile();

  return {
    auth: {
      id: data?.id || '',
      nickname: data?.nickname || '',
      email: data?.email || '',
      imageUri: data?.imageUri || '',
    },
    signupMutation,
    loginMutation,
    isLogin,
    logoutMutation,
    profileMutation,
    kakaoLoginMutation,
  };
}

export default useAuth;
