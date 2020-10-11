import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

import {main} from './package.json';

let globals = {
	'@seregpie/three.text-texture': 'THREE.TextTexture',
	'three': 'THREE',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins: [
		babel({
			babelHelpers: 'bundled',
			presets: [['@babel/preset-env', {
				targets: ['defaults', 'not IE 11'],
			}]],
		}),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'THREE.TextSprite',
		globals,
	},
};
