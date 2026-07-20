import antfu from "@antfu/eslint-config"

export default antfu({
  typescript: true,
  jsonc: true,
  formatters: { markdown: true },
  ignores: ["templates/**"],
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: false,
  },
  rules: {
    "no-new": "off",
    "no-undef": "off",
    "no-alert": "off",
    "no-console": "off",
    "node/prefer-global/process": "off",
    "curly": ["error", "all"],
    "object-curly-newline": ["error", {
      ObjectExpression: { multiline: false, consistent: true },
      ObjectPattern: { multiline: false, consistent: true },
      ImportDeclaration: { multiline: false, consistent: true },
      ExportDeclaration: { multiline: false, consistent: true },
    }],
  },
})
