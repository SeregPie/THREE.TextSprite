import {
	Math,
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from '@seregpie/three.text-texture';

import _updateScale from './classPrototypeMembers/updateScale';

export default class extends Sprite {
	constructor({
		fontSize = 1,
		...textureOptions
	} = {}) {
		super(new SpriteMaterial({
			depthWrite: false,
			map: new TextTexture({
				...textureOptions,
				fontSize: 0,
			}),
		}));
		Object.assign(this, {
			fontSize,
			updateScale: _updateScale,
		});
	}

	onBeforeRender(renderer, scene, camera) {
		let {material} = this;
		let {map} = material;
		map.fontSize = Math.ceilPowerOfTwo(map.computeOptimalFontSize(this, renderer, camera));
		this.updateScale();
	}

	dispose() {
		let {material} = this;
		let {map} = material;
		map.dispose();
		material.dispose();
	}
}
