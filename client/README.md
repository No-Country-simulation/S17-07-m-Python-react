# S17-07-m-Python-react Frontend

This template provides a minimal setup to build a music player using React and Vite, with Hot Module Replacement (HMR) and some ESLint rules.

## Package Manager

This project uses [pnpm](https://pnpm.io/), a fast, disk space-efficient package manager. You can install dependencies and manage scripts as follows:

- To install dependencies: `pnpm install`
- To start the development server: `pnpm run dev`
- To build the project: `pnpm run build`

For more information on pnpm, you can check out the [pnpm documentation](https://pnpm.io/motivation).

## React + Vite

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
pnpm run lint
```

### Auto-Fix Linting Issues

Run this command to automatically fix linting issues:

```
pnpm run lint --fix
```

## Architecture

Structure based on modular architecture

```
└── 📁src
    └── 📁core
        └── 📁assets
        └── 📁layouts
        └── 📁routes
        └── 📁services
        └── 📁themes
        └── 📁utils
    └── 📁modules
        └── 📁dashboard
            └── 📁components
            └── 📁helpers
            └── 📁hooks
            └── 📁pages
            └── 📁services
            └── 📁submodules
                └── 📁library
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
                └── 📁player
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
                └── 📁playlists
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
                └── 📁recommendation
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
                └── 📁search
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
        └── 📁start
            └── 📁components
            └── 📁helpers
            └── 📁hooks
            └── 📁pages
            └── 📁services
            └── 📁submodules
                └── 📁auth
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
                └── 📁home
                    └── 📁components
                    └── 📁helpers
                    └── 📁hooks
                    └── 📁pages
                    └── 📁services
    └── App.css
    └── App.jsx
    └── index.css
    └── main.jsx
```

## Palette

Two custom themes are configured in Material UI using `createTheme`, with specific color palettes for light and dark modes. The themes include primary, secondary, red, yellow, and brown colors, each with different shades depending on the mode. These themes ensure consistent visuals across the application.

| Color     | `lightTheme`                                                              | `darkTheme`                                                               |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Primary   | ![#D2B50F](https://via.placeholder.com/15/D2B50F/000000?text=+) `#D2B50F` | ![#FACD66](https://via.placeholder.com/15/FACD66/000000?text=+) `#FACD66` |
| Secondary | ![#FACD66](https://via.placeholder.com/15/FACD66/000000?text=+) `#FACD66` | ![#D2B50F](https://via.placeholder.com/15/D2B50F/000000?text=+) `#D2B50F` |
| Red       | ![#a3534b](https://via.placeholder.com/15/a3534b/000000?text=+) `#a3534b` | ![#8C281F](https://via.placeholder.com/15/8C281F/000000?text=+) `#8C281F` |
| Yellow    | ![#FFE668](https://via.placeholder.com/15/FFE668/000000?text=+) `#FFE668` | ![#FADB3E](https://via.placeholder.com/15/FADB3E/000000?text=+) `#FADB3E` |
| Brown     | ![#F3E1C7](https://via.placeholder.com/15/F3E1C7/000000?text=+) `#F3E1C7` | ![#594539](https://via.placeholder.com/15/594539/000000?text=+) `#594539` |

_For further color customization, refer to the [Material UI Color Playground](https://mui.com/material-ui/customization/color/#playground)._
