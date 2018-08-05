import {
	Math as THREE_Math,
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from 'three.texttexture';

import getOptimalFontSize from './getOptimalFontSize';

export default class extends Sprite {
	constructor({
		textSize = 1,
		redrawInterval = 1,
		maxFontSize = Infinity,
		material = {},
		texture = {},
	} = {}) {
		super(new SpriteMaterial({...material, map: new TextTexture(texture)}));
		this.textSize = textSize;
		this.redrawInterval = redrawInterval;
		this.maxFontSize = maxFontSize;
		this.lastRedraw = 0;
	}

	get isTextSprite() {
		return true;
	}

	onBeforeRender(renderer, scene, camera) {
		this.redraw(renderer, camera);
	}

	updateScale() {
		this.scale.set(this.material.map.imageAspect, 1, 1).multiplyScalar(this.textSize * this.material.map.imageHeight);
	}

	updateMatrix(...args) {
		this.updateScale();
		return super.updateMatrix(...args);
	}

	redraw(renderer, camera) {
		if (this.lastRedraw + this.redrawInterval < Date.now()) {
			if (this.redrawInterval) {
				setTimeout(() => {
					this.redrawNow(renderer, camera);
				}, 1);
			} else {
				this.redrawNow(renderer, camera);
			}
		}
	}

	redrawNow(renderer, camera) {
		this.updateScale();
		this.material.map.autoRedraw = true;
		this.material.map.fontSize = Math.min(THREE_Math.ceilPowerOfTwo(getOptimalFontSize(this, renderer, camera)), this.maxFontSize);
		this.lastRedraw = Date.now();
	}

	dispose() {
		this.material.map.dispose();
		this.material.dispose();
	}
}
