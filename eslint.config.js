const tseslint = require('typescript-eslint');
const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const jestPlugin = require('eslint-plugin-jest');
const jsxA11y = require('eslint-plugin-jsx-a11y');

const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
	js.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	/**
	 * Static AST checker for accessibility rules on JSX elements.
	 * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
	 */
	jsxA11y.flatConfigs.recommended,
	prettierRecommended,
	{
		files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
		plugins: {
			import: importPlugin,
			jest: jestPlugin,
		},
		rules: {
			'arrow-parens': ['error', 'always'],
			'class-methods-use-this': [
				'warn',
				{
					enforceForClassFields: false,
				},
			],
			'consistent-return': 'off',
			curly: ['error', 'multi-line'],
			'default-param-last': 'off',
			'global-require': 'off',
			'import/extensions': [
				'error',
				'never',
				{
					js: 'never',
					jsx: 'never',
					ts: 'never',
					tsx: 'never',
					mjs: 'never',
					json: 'always',
					config: 'always',
				},
			],
			'import/named': 'off',
			'import/no-dynamic-require': 'off',
			'import/no-extraneous-dependencies': 'off',
			'import/no-named-as-default': 'off',
			'import/no-unresolved': 'off',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'object',
						'index',
						'type',
					],
					pathGroups: [
						{
							pattern: '~/**',
							group: 'external',
						},
						{
							pattern: '@/**',
							group: 'external',
						},
					],
				},
			],
			indent: ['off', 'tab'],
			'linebreak-style': ['error', 'unix'],
			'lines-between-class-members': [
				'error',
				'always',
				{
					exceptAfterSingleLine: true,
				},
			],
			'max-len': [
				'error',
				{
					code: 100,
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreComments: true,
					ignoreTemplateLiterals: true,
					ignoreTrailingComments: true,
					ignoreRegExpLiterals: true,
				},
			],
			'new-parens': ['error', 'always'],
			'no-await-in-loop': 'off',
			'no-bitwise': 'off',
			'no-console': [
				'off',
				{
					allow: ['error'],
				},
			],
			'no-constant-binary-expression': 'off',
			'no-constructor-return': 'off',
			'no-fallthrough': 'off',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-param-reassign': [
				'error',
				{
					props: false,
				},
			],
			'no-restricted-exports': 'off',
			'no-restricted-syntax': 'off',
			'no-shadow': 'off',
			'no-undef': 'off',
			'no-underscore-dangle': 'off',
			'no-unused-vars': 'off',
			'no-use-before-define': 'off',
			'prefer-destructuring': 'off',
			'prefer-template': 'off',
			quotes: [
				'error',
				'single',
				{
					avoidEscape: true,
					allowTemplateLiterals: true,
				},
			],
			semi: ['error', 'always'],
			'@typescript-eslint/adjacent-overload-signatures': 'off',
			'@typescript-eslint/array-type': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/camelcase': 'off',
			'@typescript-eslint/class-name-casing': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/linebreak-style': 'off',
			'@typescript-eslint/member-delimiter-style': 'off',
			'@typescript-eslint/member-ordering': 'warn',
			'@typescript-eslint/no-angle-bracket-type-assertion': 'off',
			'@typescript-eslint/no-dynamic-delete': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/no-invalid-void-type': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/no-underscore-dangle': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					args: 'all',
				},
			],
			'@typescript-eslint/no-use-before-define': 'warn',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/prefer-for-of': 'off',
			'@typescript-eslint/semi': 'off',
		},
	},
	{
		ignores: ['**/node_modules/', '**/dist/', '**/tests/', '**/stories/'],
	},
];
