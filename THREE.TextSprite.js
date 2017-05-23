(function(THREE) {

	let onBeforeRender = function(renderer, a, camera) {
		this.updateScale();
		let now = Date.now();
		if (now > this.lastRedraw + this.redrawDelay) {
			let redraw = this.redraw.bind(this, renderer, camera);
			if (this.redrawDelay) {
				setTimeout(redraw);
			} else {
				redraw();
			}
			this.lastRedraw = now;
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
			this.textSize = textSize;
			this.redrawDelay = redrawDelay;
			this.roundFontSizeToNearestPowerOfTwo = roundFontSizeToNearestPowerOfTwo;
			this.maxFontSize = maxFontSize;
			this.lastRedraw = 0;

			let mesh = new THREE.Mesh();
			mesh.onBeforeRender = onBeforeRender.bind(this);
			this.add(mesh);
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

		updateScale() {
			this.scale.setX(this.material.map.aspect).setY(1).multiplyScalar(this.textSize);
		}

		redraw(renderer, camera) {
			let fontSize = this.calculateOptimalFontSize(renderer, camera);
			if (this.roundFontSizeToNearestPowerOfTwo) {
				fontSize = THREE.Math.nearestPowerOfTwo(fontSize);
			}
			fontSize = Math.min(fontSize, this.maxFontSize);
			this.material.map.fontSize = fontSize;
		}
	};

	Object.assign(THREE.TextSprite.prototype, {
		isTextSprite: true,
	});

}).call(this, THREE);