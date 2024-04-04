import withSolid from "rollup-preset-solid";
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';

export default withSolid({
	input: "src/index.ts",
	output: {
		file: "dist/bundle.js",
		format: "es",
		sourcemap: true,
	},
	watch: {
		include: "src/**",
	},
	plugins: [
		postcss({
			extensions: ['.css', '.scss'],
			plugins: [tailwindcss('./tailwind.config.js')],
		})
	],
});
