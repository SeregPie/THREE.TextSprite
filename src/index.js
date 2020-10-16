import {
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from '@seregpie/three.text-texture';

let Class = class extends Sprite {
	constructor(
		{
			fontSize = 1,
			...options
		} = {},
		material = new SpriteMaterial({
			depthWrite: false,
		}),
	) {
		super(material);
		let texture = new TextTexture({
			fontSize,
			...options,
		});
		this.material.map = texture;
	}

	onBeforeRender(renderer, scene, camera) {
		let {material} = this;
		let {map: texture} = material;
		if (texture.checkFontFace()) {
			let {scale} = this;
			let {
				height,
				width,
			} = texture;
			if (width && height) {
				scale.setX(width).setY(height);
				texture.setOptimalPixelRatio(this, renderer, camera);
				texture.redraw();
			} else {
				scale.setScalar(1);
			}
		} else {
			texture.loadFontFace();
		}
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
	'backgroundColor',
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
