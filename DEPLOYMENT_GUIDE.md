# 프로덕션 배포 가이드

## EC2 서버 주소 설정

### 1. 환경 변수 파일 설정
프로젝트 루트에 환경 변수 파일들이 생성되어 있습니다:

**`.env` (개발 환경)**
```
# Development environment
API_BASE_URL=http://192.168.0.28:3030
```

**`.env.production` (프로덕션 환경)**
```
# Production environment
API_BASE_URL=https://your-ec2-domain.com
```

### 2. 프로덕션 서버 주소 변경
`.env.production` 파일에서 `API_BASE_URL`을 실제 EC2 서버 주소로 변경하세요:

### 2. EC2 서버 주소 형식 예시
- 도메인이 있는 경우: `https://api.yourapp.com`
- IP 주소만 있는 경우: `http://13.124.123.45:3030`
- ALB/CloudFront 사용 시: `https://your-cloudfront-domain.cloudfront.net`

### 3. 환경별 동작
- **개발 환경** (`__DEV__ = true`): 
  - 에뮬레이터: `http://10.0.2.2:3030` (Android) / `http://localhost:3030` (iOS)
  - 실제 기기: `config.development.API_BASE_URL`
  
- **프로덕션 환경** (`__DEV__ = false`):
  - 모든 플랫폼: `config.production.API_BASE_URL`

### 4. 빌드 설정
환경별 빌드 명령어:

**개발 환경 빌드** (`.env` 파일 사용)
```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

**프로덕션 환경 빌드** (`.env.production` 파일 사용)
```bash
# Android 프로덕션 빌드
ENVFILE=.env.production npx react-native run-android --variant=release

# iOS 프로덕션 빌드
ENVFILE=.env.production npx react-native run-ios --configuration Release
```

### 5. 주의사항
- EC2 보안 그룹에서 앱에서 사용하는 포트(예: 3030)를 허용해야 합니다.
- HTTPS를 사용하는 경우 SSL 인증서가 올바르게 설정되어 있어야 합니다.
- Android에서는 HTTP 연결이 기본적으로 차단되므로, HTTP를 사용해야 하는 경우 네트워크 보안 설정을 변경해야 할 수 있습니다.
