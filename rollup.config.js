import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

let globals = {
	'three': 'THREE',
	'three.texttexture': 'THREE.TextTexture',
};

export default {
	input: 'src/index.js',
	external: Object.keys(globals),
	output: {
		file: pkg.main,
		format: 'umd',
		name: 'THREE.TextSprite',
		globals,
	},
	plugins: [
		buble({
			objectAssign: 'Object.assign',
		}),
		uglify(),
	],
};
