import THREE from 'three';
import 'three.texttexture';

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

	computeOptimalFontSize(renderer, camera) {
		if (renderer.domElement.width && renderer.domElement.height && this.material.map.lines.length) {
			let distance = this.getWorldPosition().distanceTo(camera.getWorldPosition());
			if (distance) {
				let heightInPixels = this.getWorldScale().y * renderer.domElement.height / distance;
				if (heightInPixels) {
					return Math.round(heightInPixels / this.material.map.paddingBoxHeight);
				}
			}
		}
		return 0;
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
		let fontSize = this.computeOptimalFontSize(renderer, camera);
		fontSize = THREE.Math.ceilPowerOfTwo(fontSize);
		fontSize = Math.min(fontSize, this.maxFontSize);
		this.material.map.fontSize = fontSize;
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
