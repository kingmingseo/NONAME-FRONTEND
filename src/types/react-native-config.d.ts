declare module 'react-native-config' {
  export interface NativeConfig {
    GOOGLE_MAP_API_KEY?: string;
    KAKAO_REST_API_KEY?: string;
    API_BASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
