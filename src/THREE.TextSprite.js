import THREE from 'three';
import 'three.texttexture';

let onBeforeRender = function(renderer, scene, camera) {
	this.redraw(renderer, camera);
};

let TextSprite = class extends THREE.Sprite {
	constructor({
		textSize = 1,
		redrawInterval = 1,
		roundFontSizeToNearestPowerOfTwo = true,
		maxFontSize = Infinity,
		material = {},
		texture = {},
	} = {}) {
		super(new THREE.SpriteMaterial(Object.assign({}, material, {map: new THREE.TextTexture(texture)})));
		this.textSize = textSize;
		this.redrawInterval = redrawInterval;
		this.roundFontSizeToNearestPowerOfTwo = roundFontSizeToNearestPowerOfTwo;
		this.maxFontSize = maxFontSize;
		this.lastRedraw = 0;

		this._renderMesh = new THREE.Mesh();
		this._renderMesh.onBeforeRender = onBeforeRender.bind(this);
		this.add(this._renderMesh);
	}

	get isTextSprite() {
		return true;
	}

	updateScale() {
		this.scale.set(this.material.map.aspect, 1, 1).multiplyScalar(this.textSize);
	}

	updateMatrix(...args) {
		this.updateScale();
		return super.updateMatrix(...args);
	}

	computeOptimalFontSize(renderer, camera) {
		if (renderer.domElement.width && renderer.domElement.height && this.material.map.textBoxHeight) {
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
		if (this.roundFontSizeToNearestPowerOfTwo) {
			fontSize = THREE.Math.nearestPowerOfTwo(fontSize);
		}
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

THREE.TextSprite = TextSprite;