This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Architecture Overview (프로젝트 아키텍처 개요)

- 스택 구성
  - UI: React Native, React Navigation(Stack/Drawer), Gesture/Screens/SafeArea
  - 데이터: React Query v5, Axios
  - 네이티브: react-native-maps, image-crop-picker, permissions, bootsplash, encrypted-storage
  - 알림/피드백: react-native-toast-message

- 앱 진입/Provider
  - index.js → App.tsx
  - App.tsx에서 QueryClientProvider, NavigationContainer, Toast 설정, StatusBar 설정
  - BootSplash 초기화 후 숨김 처리

- 네비게이션
  - RootNavigation: `useAuth().isLogin` 여부로 분기
    - 비로그인: AuthNavigation(Stack) → AuthHome, Login, Signup, KakaoLogin
    - 로그인: DrawerNavigation → MapStack, FeedStack, Calendar, Setting

- 데이터/네트워크
  - React Query: `src/api/queryClient.ts` 기본옵션(`retry=false`, `staleTime=60s`)
  - Axios: `src/api/axios.ts`에서 baseURL 관리(환경/에뮬레이터 고려), 공통 헤더는 `utils/header.ts`
  - API 모듈: `src/api/auth.ts`, `post.ts`, `marker.ts`, `image.ts`

- 인증
  - 로그인 시 AccessToken을 헤더에 세팅, RefreshToken은 암호 저장(`utils/encryptStorage.ts`)
  - `useGetRefreshToken`으로 주기적 access 갱신, 로그아웃 시 헤더/스토리지 정리

- 프레젠테이션/테마
  - 공통 컴포넌트: `src/components/common/*`(버튼/인풋/에러경계/이미지 등)
  - 테마: `useThemeStorage` + `constants/colors.ts` 기반 라이트/다크 일관 적용

- 에러/로딩
  - 전역 에러 경계: `RetryErrorBoundary`
  - 요청 단위 에러는 React Query 옵션과 토스트로 안내

- 환경/네이티브 설정
  - `config.ts`의 환경값, iOS/Android에서 BootSplash 및 Google Maps 키 설정

## Folder Structure (폴더 구조)

```text
src/
  api/
    axios.ts            # Axios 인스턴스 및 baseURL 관리
    auth.ts             # 인증 API (로그인/프로필/토큰 갱신)
    image.ts            # 이미지 업로드 API
    marker.ts           # 지도 마커 API
    post.ts             # 피드/게시물 API
    queryClient.ts      # React Query 클라이언트 설정
  assets/               # 앱 내부에서 사용하는 이미지/리소스
  components/
    common/             # 공통 UI 컴포넌트(버튼/인풋/에러경계 등)
    feed/               # 피드 관련 컴포넌트
    map/                # 지도/마커 관련 컴포넌트
    post/               # 게시물 작성 관련 컴포넌트
    calendar/           # 캘린더 관련 컴포넌트
    setting/            # 설정 화면 관련 컴포넌트
  constants/            # 색상/키/문구/숫자 상수
  hooks/
    queries/            # API 연동용 커스텀 훅(React Query)
    useForm.ts          # 폼 상태 및 바인딩 유틸
    usePermission.ts    # 권한 처리 훅
    useUserLocation.ts  # 사용자 위치 획득 훅
    ...                 # 모달/이미지/검색 등 기타 훅
  navigations/          # 루트/스택/드로어 네비게이션 정의
  screens/              # 실제 화면 단위 컴포넌트
    auth/               # 로그인/회원가입/카카오 로그인 등
    feed/               # 피드 목록/상세/즐겨찾기/이미지 줌 등
    calendar/
    map/
    setting/
  store/                # 전역 상태(필터/위치/테마 등)
  types/                # 도메인/네비/환경 타입 정의
  utils/                # 날짜/검증/이미지/헤더/스토리지 유틸
```

> 위 구조는 실제 레포를 요약한 것이며, 세부 항목은 프로젝트 발전에 따라 조정될 수 있습니다.
