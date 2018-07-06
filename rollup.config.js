import {uglify} from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';
import path from 'path';

import {main} from './package.json';

let globals = {
	'three': 'THREE',
	'three.texttexture': 'THREE.TextTexture',
};

export default {
	input: 'src/index.js',
	external: Object.keys(globals),
	output: {
		file: main,
		format: 'umd',
		name: path.basename(main, path.extname(main)),
		globals,
	},
	plugins: [
		buble({objectAssign: 'Object.assign'}),
		uglify(),
	],
};
