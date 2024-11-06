# React + TypeScript + Vite

This project is a from roadmapsh.
https://roadmap.sh/projects/github-random-repo

### See the Live verison
https://my-githubrandom.vercel.app/

How to run this project

clone this repository

`$ git clone https://github.com/alfisahrul/my-githubrandom.git`

using yarn to install 

` yarn add`

using yarn to run web

` yarn dev`

####Library  (-)

- Zustand
- Tanstack/react-query
- emotion/styled

## Objective
The main goals of this project were to refresh my knowledge fetching data from external APIs with React and styling with Tailwind. However, due to the limitaions of the GitHub API, the project evolved to focus on implementing a caching system to avoid hitting the API limits. This change made the "Refresh" functionality and changing language almost instantaneous without the need to make additional API requests, which became the top priority after discovering the issue.


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
