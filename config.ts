import Config from 'react-native-config';

// 환경 변수에서 API 기본 URL 가져오기
export const API_BASE_URL = Config.API_BASE_URL || 'http://localhost:3030';

// 개발 환경 여부 확인
export const isDevelopment = __DEV__;
