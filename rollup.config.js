import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

export default {
	input: 'src/THREE.TextSprite.js',
	external: ['three'],
	output: {
		file: 'THREE.TextSprite.js',
		format: 'umd',
		name: 'THREE.TextSprite',
		globals: {
			'three': 'THREE',
		},
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: [
				['env', {
					targets: {
						'browsers': ['last 2 versions'],
					},
					modules: false,
					useBuiltIns: true,
				}],
			],
		}),
		nodeResolve(),
		commonjs({
			include: 'node_modules/**',
		}),
		minify({comments: false}),
	],
};