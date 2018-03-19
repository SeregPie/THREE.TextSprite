import THREE from 'three';
import 'three.texttexture';

import getOptimalFontSize from './getOptimalFontSize';

THREE.TextSprite = class extends THREE.Sprite {
	constructor({
		textSize = 1,
		redrawInterval = 1,
		maxFontSize = Infinity,
		material = {},
		texture = {},
	} = {}) {
		super(new THREE.SpriteMaterial({...material, map: new THREE.TextTexture(texture)}));
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
		this.scale.set(this.material.map.aspect, 1, 1).multiplyScalar(this.textSize * this.material.map.paddingBoxHeight);
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
		this.material.map.fontSize = Math.min(THREE.Math.ceilPowerOfTwo(getOptimalFontSize(this, renderer, camera)), this.maxFontSize);
		if (!this.material.map.autoRedraw) {
			this.material.map.redraw();
		}
		this.lastRedraw = Date.now();
	}

	dispose() {
		this.material.map.dispose();
		this.material.dispose();
	}
};
