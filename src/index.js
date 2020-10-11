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
		let {
			material,
			scale,
		} = this;
		let {map: texture} = material;
		let {
			height,
			width,
		} = texture;
		if (width && height) {
			scale.setX(width).setY(height);
		} else {
			scale.setScalar(1);
		}
		texture.setOptimalPixelRatio(this, renderer, camera);
		texture.redraw();
	}

	dispose() {
		let {material} = this;
		let {map: texture} = material;
		texture.dispose();
		material.dispose();
	}
};

[
	'alignment',
	'color',
	'fontFamily',
	'fontSize',
	'fontStyle',
	'fontVariant',
	'fontWeight',
	'lineGap',
	'padding',
	'strokeColor',
	'strokeWidth',
	'text',
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
