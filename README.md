# Photo grid app
This is a simple photo grid app bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Pre requsites
- Node v21
- Pexels API key
- Install packages

```
bun i
```
or
```
npm i
```
- Create a .env file and add [PEXELS_API_KEY](https://www.pexels.com/api/documentation/) to NEXT_PUBLIC_PEXELS_API_KEY

## Getting Started

To run development server:

```bash
bun dev
```
or
```
npm run dev
```

To run test cases:

```
bun run test
```
or
```
npx test
```

To build production:
```
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Performance improvements and decisions
I have commend in the code directly wherever it needs improvement and decisions that are made in that place.

Generic decisions:

Framework: Next.js - As the framework offers out of the box image optimizations, ssr, code-splitting I have decided to use it

CSS-in-JS - emotion/styled - This one is slightly efficient in terms of bundle size compared to the well known styled-components

Tests: I have used GPT to write tests to save time, I wish I had used TDD because of that there are some bugs still left uncovered.

Folder structure: I used a simple folder structure and kept the components simple.  I could have followed an architecture like Atomic design principles or Clean architecture but kept it simple as there is no need for it now.







