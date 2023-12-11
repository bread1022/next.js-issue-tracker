# GitHub Issue 관리 서비스

**프로젝트 소개**

- Issue 생성 및 조회 기능으로 이슈를 관리할 수 있는 GitHub Issue 서비스 클론 프로젝트를 Next.js로 재구성하였습니다.
- 개인 작업 기간: 2023.10.02 - 2023.10.31
- 기술스택: Next.js, TypeScript, TailwindCSS, Storybook, Vercel
- 서비스 이용: [Issue-tracker](https://next-js-issue-tracker.vercel.app)
- 기존 리액트 프로젝트: [Team GitHub](https://github.com/codesquad-2023-group04/issue-tracker)

**서비스 화면**

![이슈트래커 영상](https://github.com/bread1022/next.js-issue-tracker/assets/107349637/fca1eb49-7549-4270-a30a-291a8bf08b7f)

---

### 프로젝트 특징

- 백엔드와 프론트엔드를 통합 개발하였습니다.

  - Next.js API routes를 사용하여 백엔드 API 구현
  - Next-auth를 사용하여 GitHub 로그인 구현

  ```
  📦 issue-tracker
  ├─ sanity
  └─ src
     ├─ ap
     │  ├─ api
     │  │  ├─ auth
     │  │  │  └─ [...nextauth]
     │  │  ├─ issue
     │  │  ├─ issues
     │  │  │  ├─ [id]
     │  │  │  │  ├─ comments
     │  │  ├─ label
     │  │  └─ user
     │  ├─ auth
     │  │  ├─ signin
     │  │  └─ page.tsx
     │  ├─ issue
     │  │  ├─ layout.tsx
     │  │  ├─ not-found.tsx
     │  │  └─ page.tsx
     │  ├─ new
     │  │  ├─ page.tsx
     │  │  └─ layout.tsx
     │  ├─ page.tsx
     │  ├─ layout.tsx
     │  ├─ globals.cs
     │  └─ favicon.ico
     ├─ components
     │  ├─ Common
     │  │  ├─ Alert
     │  │  ├─ Avatar
     │  │  ├─ Button
     │  │  ├─ CheckBox
     │  │  ├─ CheckCircle
     │  │  ├─ Dropdown
     │  │  ├─ Header
     │  │  ├─ LabelTag
     │  │  ├─ MarkdownViewer
     │  │  ├─ Skeleton
     │  │  ├─ TextArea
     │  │  └─ TextInput
     │  ├─ Detai
     │  │  ├─ CommentsContainer
     │  │  ├─ SideBar
     │  │  └─ Subtitle
     │  ├─ IssueList
     │  │  ├─ FilterBar
     │  │  ├─ IssueTable
     │  │  ├─ LinkBtns
     │  │  └─ TableHeader
     │  ├─ New
     │  │  ├─ IssueForm
     │  │  └─ SideBar
     │  ├─ Signin
     │  └─ ui
     │     └─ icons
     ├─ context
     ├─ hook
     ├─ lib
     ├─ model
     ├─ service
     ├─ types
     ├─ utils
     └─ middleware.ts
  ```

- Sanity를 사용하여 데이터를 관리하였습니다.

<p align="center"><img src="https://github.com/bread1022/next.js-issue-tracker/assets/107349637/c8adc615-e8dd-45b5-b3d8-b961bebd2b42" width="400px"/></p>

- Next.js를 사용하여 SSR, CSR을 구현하였습니다.
- TailwindCSS를 사용하여 스타일링하고 Storybook을 사용하여 UI를 [문서화](https://657719e9f3afcc0a456dd728-mngzztluch.chromatic.com)하였습니다.

### 🤔 프로젝트 회고

배포 테스트를 제대로 하지 못하고 마무리됐던 지난 프로젝트에서 컴포넌트 구성부터 배포까지 아쉬웠던 부분을 보완하고 Next.js를 학습하고자 이번 프로젝트를 진행하였습니다.  
백엔드 구현을 위한 API routes, SEO 최적화를 위한 SSR, CSR 등 기존 프로젝트에서는 사용하지 않았던 기능들을 활용하면서 최신 리액트 기술을 확장해보고 Headless CMS를 사용하여 백엔드와 프론트엔드를 통합 개발하였습니다. Next로 재구현하면서 리액트의 기본 개념을 복습하고 컴포넌트 구성과 상태관리를 다시 한번 정리할 수 있었고 프로젝트의 완성도를 높일 수 있었습니다.
