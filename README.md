# DevTogether

## 개요

카드 형식의 게시글을 작성할 수 있는 커뮤니티 사이트

## 기능

- React-Hook-Form 라이브러리를 사용해 Form 기능 구현
- Firebase Auth 기능을 이용해 회원가입, 로그인 기능 구현
- Firebase Firestore 기능을 이용해 데이터 저장
- React-Query를 이용한 데이터 캐싱 및 Infinite Scroll, Optimistic UI 기능 구현
- Firebase Hosting 기능을 이용해 배포

## 사용 기술

- HTML, Tailwind CSS
- TypeScript
- React
- React-Query
- Firebase (Firestore, Auth, Hosting)
- React-Hook-Form
- gravatar, uuid, react-icons, axios

## 실행 방법

```
npm install
npm run dev
```

## 파일 구조

```
├─ public
├─ src
│  ├─ api
│  │  └─ firebase.ts
│  ├─ assets
│  ├─ components
│  │  ├─ AddPostBox
│  │  ├─ AddPostButton
│  │  ├─ Button
│  │  ├─ ChatProfile
│  │  ├─ CheckBox
│  │  ├─ CommentGroup
│  │  ├─ Header
│  │  ├─ Input
│  │  ├─ LikeButton
│  │  ├─ LikeModal
│  │  ├─ Message
│  │  ├─ Modal
│  │  ├─ Nav
│  │  ├─ PopularPost
│  │  ├─ PostCard
│  │  ├─ PostProfile
│  │  ├─ Reaction
│  │  ├─ Terms
│  │  └─ Timeline
│  ├─ context
│  │  └─ loginContext.tsx
│  ├─ layout
│  │  ├─ Loading
│  │  └─ LoginLayout
│  ├─ pages
│  │  ├─ AddPost
│  │  ├─ ChatPage
│  │  ├─ Home
│  │  ├─ Login
│  │  ├─ PostDetail
│  │  └─ SignUp
│  ├─ types
│  │  ├─ chat.ts
│  │  ├─ post.ts
│  │  ├─ react-hook-form.ts
│  │  ├─ signup.ts
│  │  └─ user.ts
│  ├─ utils
│  │  ├─ error-message.ts
│  │  └─ formmattedDate.ts
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ router.tsx
├─ index.html
├─ README.md
├─ vite.config.js
```
