import * as THREE from 'three';
import THREE_TextTexture from '@seregpie/three.text-texture';

export default class extends THREE.Sprite {
	constructor({
		fontSize = 1,
		...textureOptions
	} = {}) {
		let texture = new THREE_TextTexture({
			...textureOptions,
			fontSize: 0,
		});
		let material = new THREE.SpriteMaterial({
			depthWrite: false,
			map: texture,
		});
		super(material);
		Object.assign(this, {
			fontSize,
		});
	}

	get width() {
		let {
			fontSize,
			material,
		} = this;
		let {map} = material;
		let {width} = map;
		width *= fontSize;
		return width;
	}

	get height() {
		let {
			fontSize,
			material,
		} = this;
		let {map} = material;
		let {height} = map;
		height *= fontSize;
		return height;
	}
}
