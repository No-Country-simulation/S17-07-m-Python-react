# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Linting and Code Formatting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to maintain code quality and consistency. Below is an overview of how these tools are configured and how you can use them in your development environment.

### ESLint

ESLint is used to identify and fix problems in JavaScript/TypeScript code. The ESLint configuration is defined in the `.eslintrc` or `eslint.config.js` file in the project root.

#### Rules and Configuration

- **Validation**: ESLint validates JavaScript, JSX, TypeScript, and TSX files.
- **Auto-Fix**: ESLint issues are automatically fixed on file save if you have `codeActionsOnSave` enabled.

### Prettier

Prettier is used for automatic code formatting to ensure consistent code style throughout the project. The Prettier configuration is defined in the `.prettierrc` file in the project root.

#### Configuration

- **Format on Save**: Prettier is configured to format code automatically upon saving a file.
- **Configuration File**: The specific Prettier settings are in the `.prettierrc` file.

### VS Code Setup

If you are using [Visual Studio Code](https://code.visualstudio.com/), ensure the following extensions are installed for an optimal development experience:

- **ESLint**: `dbaeumer.vscode-eslint`
- **Prettier - Code formatter**: `esbenp.prettier-vscode`

Make sure your `.vscode/settings.json` includes the following settings to apply ESLint and Prettier correctly:

```json
{
  "editor.formatOnSave": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "prettier.requireConfig": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Commands

#### Linting

Run the following command to check for linting issues:

```
npm run lint
```

### Auto-Fix Linting Issues

Run this command to automatically fix linting issues:

```
npm run lint --fix
```
