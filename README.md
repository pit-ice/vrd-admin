# VRD-ADMIN


## 로컬 실행 명령어

```sh
# 최초 설치
npm install

# 개발서버 실행
#  .env.development 환경파일 사용됨
npm run serve

# local 환경 실행 
#  .env.local 환경파일 사용됨
npm run serve -- --mode local
# or
npm run serve-local

# 배포를 위한 빌드
npm run build

```


## 필수 설치 VS code Extension

- Vetur
    - .vue 파일의 코드 하이라이팅
    
- ESLint
    - 코딩 컨벤션, 문법검사 도구 - 코드 퀄리티 관리
    - 설정파일 : .eslintrc.js

- Prettier
    - 코드 스타일 적용
    - 설정파일 : .prettierrc.json
    - doc : https://prettier.io/docs/en/options.html
    
- Vue VSCode Snippets
    - vue 코드 조각 자동완성

## 배포

- dockerize
```sh
docker build -t vrd-admin .
docker images
docker tag sam-frontend bekube/vrd-admin:latest
# push 전에 권한추가 필요
docker push bekube/vrd-admin:latest
```

- deploy k8s
```
kubectl apply -f ./k8s -n vrd-dev
```


## 소스 관련

- axios-mock-adapter 적용
    - 유닛테스트나 서버구동없이 dummy api 연동을 함
    - https://github.com/ctimmerm/axios-mock-adapter
    - api 코드 : src/store/api/mock
    - json 폴더 : src/store/api/moke/data


## 템플릿 관련 링크
- 템플릿 메인 페이지 : https://keenthemes.com/metronic/
- vuetify : https://vuetifyjs.com/ko/
- bootstrap vue : https://bootstrap-vue.org/
- 시안 작업 소스 : https://github.com/pit-ice/first-metronic (demo1 폴더에 원본 샘플페이지 있음)