import {
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from '@seregpie/three.text-texture';

let Class = class extends Sprite {
	constructor(options) {
		let map = new TextTexture(options);
		let material = new SpriteMaterial({
			depthWrite: false,
			map,
		});
		super(material);
	}

	onBeforeRender(renderer, scene, camera) {
		let {
			material,
			scale,
		} = this;
		let {map} = material;
		map.loadFontFace();
		if (map.ready) {
			map.setOptimalPixelRatio(this, renderer, camera);
			map.redraw();
			let {
				height,
				width,
			} = map;
			if (width && height) {
				scale.setX(width).setY(height);
			} else {
				scale.setX(1).setY(1);
			}
		}
	}

	dispose() {
		let {material} = this;
		let {map} = material;
		map.dispose();
		material.dispose();
	}
};

[
	'alignment',
	'color',
	'fontFamily',
	'fontStyle',
	'fontVariant',
	'fontWeight',
	'lineGap',
	'padding',
	'strokeColor',
	'strokeWidth',
	'text',

	'align',
	'fillStyle',
	'strokeStyle',
].forEach(key => {
	Object.defineProperty(Class.prototype, key, {
		get() {
			return this.material.map[key];
		},
		set(value) {
			this.material.map[key] = value;
		},
	});
});

Class.prototype.isTextSprite = true;

export default Class;
