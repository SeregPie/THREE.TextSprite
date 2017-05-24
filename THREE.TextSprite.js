(function(THREE) {

	let onBeforeRender = function(renderer, a, camera) {
		let now = Date.now();
		if (now > this.lastRedraw + this.redrawDelay) {
			let redraw = this.redraw.bind(this, renderer, camera);
			if (this.redrawDelay) {
				setTimeout(redraw);
			} else {
				redraw();
			}
			this.lastRedraw = now;
		} else {
			this.updateScale();
		}
	};

	THREE.TextSprite = class extends THREE.Sprite {
		constructor({
			textSize = 1,
			redrawDelay = 1,
			roundFontSizeToNearestPowerOfTwo = true,
			maxFontSize = Infinity,
			material = {},
			texture = {},
		} = {}) {
			super(new THREE.SpriteMaterial(Object.assign({}, material, {map: new THREE.TextTexture(texture)})));
			this._textSize = textSize;
			this.redrawDelay = redrawDelay;
			this.roundFontSizeToNearestPowerOfTwo = roundFontSizeToNearestPowerOfTwo;
			this.maxFontSize = maxFontSize;
			this.lastRedraw = 0;
			this.updateScale();

			this._renderMesh = new THREE.Mesh();
			this._renderMesh.onBeforeRender = onBeforeRender.bind(this);
			this.add(this._renderMesh);
		}

		get textSize() {
			return this._textSize;
		}

		set textSize(value) {
			if (this._textSize !== value) {
				this._textSize = value;
				this.updateScale();
			}
		}

		updateScale() {
			this.scale.set(this.material.map.aspect, 1, 1).multiplyScalar(this.textSize);
		}

		calculateOptimalFontSize(renderer, camera) {
			if (renderer.domElement.width && renderer.domElement.height && !this.material.map.blank) {
				let distance = this.getWorldPosition().distanceTo(camera.getWorldPosition());
				if (distance) {
					return Math.round(renderer.domElement.height * this.getWorldScale().y / this.material.map.lineHeight / distance);
				}
			}
			return 0;
		}

		redraw(renderer, camera) {
			this.updateScale();
			let fontSize = this.calculateOptimalFontSize(renderer, camera);
			if (this.roundFontSizeToNearestPowerOfTwo) {
				fontSize = THREE.Math.nearestPowerOfTwo(fontSize);
			}
			fontSize = Math.min(fontSize, this.maxFontSize);
			this.material.map.fontSize = fontSize;
		}

		dispose() {
			this.material.map.dispose();
			this.material.dispose();
		}
	};

	Object.assign(THREE.TextSprite.prototype, {
		isTextSprite: true,
	});

}).call(this, THREE);