import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

let globals = {
	'three': 'THREE',
};

export default {
	input: 'src/THREE.TextSprite.js',
	external: Object.keys(globals).concat(['three.texttexture']),
	output: {
		file: 'THREE.TextSprite.js',
		format: 'umd',
		globals,
	},
	plugins: [
		buble(),
		uglify(),
	],
};