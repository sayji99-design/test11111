# ABB Korea Customer Hub

ABB코리아 영업 담당자를 위한 고객관리 웹사이트 MVP입니다.

## 주요 기능

- 영업 현황 대시보드
- 고객 목록 검색 및 등급 필터
- 고객 상세정보와 영업 메모
- 영업기회 파이프라인 관리
- 미팅·전화·이메일·제안서 활동 관리
- 신규 고객·영업기회·활동 등록
- 브라우저 LocalStorage 기반 데이터 저장
- 고객 목록 CSV 내보내기
- PC·태블릿·모바일 반응형 화면

## 프로젝트 구조

```text
ABB_Korea_Customer_Hub_GitHub/
├─ .github/
│  └─ workflows/
│     └─ deploy-pages.yml
├─ docs/
│  ├─ DEPLOYMENT.md
│  └─ REQUIREMENTS.md
├─ .gitignore
├─ app.js
├─ index.html
├─ LICENSE
├─ README.md
└─ styles.css
```

## 로컬 실행

별도 설치 없이 `index.html`을 Chrome 또는 Edge로 열면 실행됩니다.

보다 안정적으로 확인하려면 VS Code의 Live Server 확장을 사용하거나 다음 명령을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## GitHub 업로드

```bash
git init
git add .
git commit -m "feat: ABB Korea customer management MVP"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

## GitHub Pages 배포

이 프로젝트에는 GitHub Actions 기반 Pages 배포 파일이 포함되어 있습니다.

1. GitHub 저장소의 **Settings**
2. **Pages**
3. Source에서 **GitHub Actions** 선택
4. `main` 브랜치에 파일을 Push
5. Actions 완료 후 Pages 주소 확인

자세한 내용은 [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)를 참고하세요.

## 데이터 저장 방식

현재 등록 데이터는 브라우저의 `localStorage`에 저장됩니다.

- 동일한 브라우저와 PC에서만 유지됩니다.
- 브라우저 데이터를 삭제하면 등록 내용도 삭제됩니다.
- 여러 사용자가 데이터를 공유할 수 없습니다.

## 실제 사내 운영 전 추가 항목

- 사용자 로그인과 권한 관리
- 중앙 데이터베이스
- 서버 API
- 개인정보 암호화
- 접속 및 변경 이력
- 고객정보 마스킹
- Microsoft 365·Outlook 연동
- 사내 보안 정책과 개인정보보호 검토

## 주의

이 저장소는 교육·시연·기획 검증용 MVP입니다.  
ABB 공식 시스템이나 공식 브랜드 사이트가 아니며, 실제 고객 개인정보를 입력하기 전 보안 검토가 필요합니다.
