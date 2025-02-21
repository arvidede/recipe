import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})
const eslintConfig = [
    ...compat.config({
        extends: ["next", "next/typescript", "prettier"],
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    }),
]
export default eslintConfig
