import axios from 'axios';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {API_BASE_URL, isDevelopment} from '../../config';

// 플랫폼별 서버 주소 설정
const getBaseURL = () => {
  // 프로덕션 환경에서는 환경 변수의 API URL 사용
  // if (!isDevelopment) {
  //   return API_BASE_URL;
  // }

  // // 개발 환경에서는 에뮬레이터/시뮬레이터 고려
  // if (Platform.OS === 'android') {
  //   return DeviceInfo.isEmulatorSync()
  //     ? 'http://10.0.2.2:3030' // Android 에뮬레이터
  //     : API_BASE_URL; // 실제 Android 기기는 환경 변수 사용
  // } else if (Platform.OS === 'ios') {
  //   return DeviceInfo.isEmulatorSync()
  //     ? 'http://localhost:3030' // iOS 시뮬레이터
  //     : API_BASE_URL; // 실제 iOS 기기는 환경 변수 사용
  // }

  // 기본값
  return API_BASE_URL;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

// 요청 인터셉터 - 요청 로깅
axiosInstance.interceptors.request.use(
  config => {
    console.log('🚀 API 요청:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  error => {
    console.error('❌ API 요청 에러:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 - 응답 로깅
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ API 응답:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  error => {
    console.error('❌ API 응답 에러:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export {axiosInstance, getBaseURL};
