module.exports = {
  "ignorePatterns": [
    '.next/',
    'build/',
    'node_modules/',
    'public/',
    'eslint/',
    '.eslintrc.js',
    'scripts/'
  ],
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "next",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "project": "./tsconfig.json",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "prettier",
    "@conarti/feature-sliced",
    "nextjs-fsd-custom"
  ],
  "root": true,
  "rules": {
    "react/display-name": "off",
    "prettier/prettier": "error",
    "semi": ["error", "never"],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-empty-function": ["error", {"allow": ["arrowFunctions"]}],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-misused-promises": [2, {
      "checksVoidReturn": {
        "attributes": false
      }
    }],
    "@typescript-eslint/dot-notation": "off",
    "object-curly-spacing": ["error", "always"],
    "camelcase": "warn",
    "radix": "off",
    "import/order": [
      "error",
      {
        "pathGroups": [
          {
            "pattern": "~/**",
            "group": "internal",
            "position": "before"
          }
        ],
        "groups": [["builtin", "external"], "internal"],
        "newlines-between": "always"
      }
    ],
    "max-len": [
      "warn",
      {
        "code": 100,
        "ignoreComments": true,
        "ignorePattern": "^import .*",
        "ignoreRegExpLiterals": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true
      }
    ],
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/newline-after-import": ["error", { "count": 1 }],
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@conarti/feature-sliced/layers-slices": ["error", {
      "ignorePatterns": ["~app/**"]
    }],
    "@conarti/feature-sliced/public-api": "error",
    "@conarti/feature-sliced/absolute-relative": "error"
  },
  "overrides": [{
    "files": ["app/**", "pages/**"],
    "rules": {
      "nextjs-fsd-custom/layers-slices": "error",
      "@conarti/feature-sliced/layers-slices": "off",
      "@conarti/feature-sliced/public-api": "off",
      "@conarti/feature-sliced/absolute-relative": "off"
    }
  }, {
    "files": ["src/pages/**", "src/widgets/**"],
    "rules": {
      "nextjs-fsd-custom/layers-slices": "error",
    }
  }],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "alias": {
        "map": [
          ["~app", "./src/app"],
          ["~entities", "./src/entities"],
          ["~features", "./src/features"],
          ["~pages", "./src/pages"],
          ["~processes", "./src/processes"],
          ["~public", "./public"],
          ["~shared", "./src/shared"],
          ["~widgets", "./src/widgets"],
          ["~layouts", "./src/layouts"]
        ],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}
