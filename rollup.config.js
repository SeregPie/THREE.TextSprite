import {terser} from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

import {main} from './package.json';

let globals = {
	'@seregpie/three.text-texture': 'THREE.TextTexture',
	'three': 'THREE',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins: [
		resolve(),
		buble({objectAssign: true}),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'THREE.TextSprite',
		globals,
	},
};
