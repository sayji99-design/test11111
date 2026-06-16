# GitHub Pages 배포 가이드

## 1. 새 저장소 생성

GitHub에서 새 저장소를 생성합니다.

권장 저장소명:

```text
abb-korea-customer-hub
```

Public 또는 Private 저장소를 선택할 수 있지만, 조직 정책과 GitHub Pages 이용 조건을 먼저 확인하세요.

## 2. 파일 업로드

압축을 해제한 폴더 내부의 모든 파일과 폴더를 저장소 최상위에 업로드합니다.

반드시 포함할 항목:

```text
.github/workflows/deploy-pages.yml
docs/
index.html
styles.css
app.js
README.md
.gitignore
LICENSE
```

## 3. GitHub Pages 설정

1. 저장소에서 `Settings` 선택
2. 왼쪽 메뉴에서 `Pages` 선택
3. `Build and deployment`의 Source를 `GitHub Actions`로 설정
4. `main` 브랜치에 파일 Push
5. `Actions` 탭에서 배포 진행 상태 확인

## 4. 배포 주소

배포가 완료되면 일반적으로 다음 형태의 주소가 생성됩니다.

```text
https://사용자명.github.io/저장소명/
```

## 5. 업데이트 방법

파일을 수정한 후 다음 명령으로 업데이트합니다.

```bash
git add .
git commit -m "update: customer hub improvements"
git push
```

Push가 완료되면 GitHub Actions가 자동으로 재배포합니다.

## 6. 문제 해결

### 화면이 빈 페이지로 표시되는 경우

- `index.html`이 저장소 최상위에 있는지 확인
- 파일명이 대소문자까지 정확한지 확인
- `styles.css`, `app.js` 경로 확인
- Actions 배포가 성공했는지 확인

### 데이터가 다른 PC에서 보이지 않는 경우

현재 데이터는 브라우저 `localStorage`에 저장되므로 정상적인 현상입니다.  
여러 사용자가 공유하려면 Firebase, Supabase 또는 별도 서버 데이터베이스 연동이 필요합니다.

### 새 버전이 바로 보이지 않는 경우

브라우저에서 강력 새로고침을 실행합니다.

- Windows: `Ctrl + F5`
- Mac: `Command + Shift + R`
