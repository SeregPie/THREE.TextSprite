import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

let globals = {
	'three': 'THREE',
};

export default {
	input: 'src/index.js',
	external: Object.keys(globals).concat(['three.texttexture']),
	output: {
		file: pkg.main,
		format: 'umd',
		globals,
	},
	plugins: [
		buble({
			objectAssign: 'Object.assign',
		}),
		uglify(),
	],
};
