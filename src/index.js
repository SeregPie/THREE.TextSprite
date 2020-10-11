import {
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from '@seregpie/three.text-texture';

let Class = class extends Sprite {
	constructor(options) {
		let texture = new TextTexture(options);
		let material = new SpriteMaterial({
			depthWrite: false,
			map: texture,
		});
		super(material);
	}

	onBeforeRender(renderer, scene, camera) {
		let texture = this.material.map;
		texture.setOptimalPixelRatio(this, renderer, camera);
		texture.redraw();
		this.scale.setX(texture.width).setY(texture.height);
	}

	dispose() {
		this.material.map.dispose();
		this.material.dispose();
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
