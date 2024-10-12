// next.config.js.
export default () => ({
	basePath: '',
	reactStrictMode: true,
	trailingSlash: false,
	swcMinify: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	transpilePackages: ['@todos/ui', '@todos/utils'],
	typescript: {
		// WARNING: production builds can successfully complete even there are type errors
		// Typechecking is checked separately via .github/workflows/typecheck.yml
		ignoreBuildErrors: true,
	},
	eslint: {
		// We are already running linting via GH action, this will skip linting during production build on Vercel
		ignoreDuringBuilds: true,
	},
});
