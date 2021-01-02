# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## github page 배포 주의 사항

### `base url`에 `relative path`가 붙을 경우 해결 방법

- [Building for Relative Paths](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)
- 다음과 같은 세팅을 하지 않으면 배포 후, root url 접속은 잘 되지만, 그 뒤로 하위 path를 입력하여 접속할 경우 404 에러가 나오게 된다.
- routing의 basename 세팅
- package.json 에서 url 정의
- 404.html 추가하여 github page에서 인식하지 못하는 url을 리다이렉션 하도록 세팅
- 404 page에서 리다이렉션된 쿼리를 index.html에서 처리하도록 수정
