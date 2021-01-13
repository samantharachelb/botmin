module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "comma-dangle": "off",
        "comma-spacing": "off",
        "no-extra-semi": "off",
        "no-extra-parens": "off",
        "brace-style": "off",
        "no-empty-function": "off",
        "no-unused-expressions": "off",
        "camelcase": "off",
        "no-explicit-any": "off",


        "@typescript-eslint/comma-dangle": ["error"],
        "@typescript-eslint/comma-spacing": ["warn"],
        "@typescript-eslint/no-extra-parens": ["error"],
        "@typescript-eslint/brace-style": ["error", "1tbs", {"allowSingleLine": true}],
        "@typescript-eslint/no-extra-semi": ["error"],
        "@typescript-eslint/no-empty-function": ["warn", {
            "allow": [
                "functions",
                "arrowFunctions"
            ]
        }],
        "@typescript-eslint/no-unused-expressions": ["error"],
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "default",
                "format": ["camelCase"]
            },
            {
                "selector": "variable",
                "format": ["camelCase", "UPPER_CASE"]
            },
            {
                "selector": "parameter",
                "format": ["camelCase"],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "typeLike",
                "format": ["PascalCase"]
            }
        ],
        "@typescript-eslint/ban-ts-comment": [
            "error",
            {
                "ts-expect-error": "allow-with-description",
                "ts-ignore": "allow-with-description"
            }
        ],
        "@typescript-eslint/no-var-requires": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"]
    }
}
