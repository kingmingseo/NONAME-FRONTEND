import {Profile} from '@/types/domain';
import {getEncryptStorage} from '@/utils/encryptStorage';
import {axiosInstance} from './axios';
type RequestUser = {
  email: string;
  password: string;
};

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};
async function postSignup({email, password}: RequestUser): Promise<void> {
  await axiosInstance.post('/auth/signup', {email, password});
}

async function postLogin({
  email,
  password,
}: RequestUser): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/signin', {email, password});
  return data;
}

async function kakaoLogin(token: string): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});
  return data;
}

async function getProfile(): Promise<Profile> {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
}

//액세스 토큰이 만료됐을 경우 리프레쉬 토큰을 통해서 엑세스토큰을 발급받는 과정
async function getAccessToken(): Promise<ResponseToken> {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
}

async function logout() {
  await axiosInstance.post('/auth/logout');
}

type RequestProfile = Pick<Profile, 'nickname' | 'imageUri'>;

async function editProfile(body: RequestProfile): Promise<Profile> {
  const {data} = await axiosInstance.patch('/auth/me', body);
  return data;
}

export {
  postSignup,
  logout,
  getProfile,
  postLogin,
  getAccessToken,
  editProfile,
  kakaoLogin,
};
