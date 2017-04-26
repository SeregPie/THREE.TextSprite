(function(THREE) {

	THREE.FontSizeAdjustingTextSprites = class extends THREE.CameraAssociatedObject {
		constructor() {
			super();
		}
	};

	Object.assign(THREE.FontSizeAdjustingTextSprites.prototype, {
		isFontSizeAdjustingTextSprites: true,

		update: (function() {
			let _calcDistance = (function() {
				let v1 = new THREE.Vector3();
				let v2 = new THREE.Vector3();

				return function(object1, object2) {
					v1.setFromMatrixPosition(object1.matrixWorld);
					v2.setFromMatrixPosition(object2.matrixWorld);
					return v1.distanceTo(v2);
				};
			})();


			let _calcFontSize = function(minDistance, maxDistance, minFontSize, maxFontSize) {
				while (minFontSize < maxFontSize && minDistance < maxDistance) {
					maxFontSize /= 2;
					minDistance *= 2;
				}
				return maxFontSize;
			};

			return function(camera) {
				let children = this.children.filter(child => {
					if (child && child.isSprite) {
						if (child.material && child.material instanceof THREE.SpriteMaterial) {
							if (child.material.map && child.material.map instanceof THREE.TextTexture) {
								return true;
							}
						}
					}
					return false;
				});
				if (children.length) {
					let distanceToCamera = _calcDistance(this, camera);
					children.forEach(child => {
						let fontSize = _calcFontSize(
							Math.min(child.scale.x, child.scale.y) * 8,
							distanceToCamera, 1, 256
						);
						child.material.map.fontSize = fontSize;
					});
				}
			};
		})(),
	});

}).call(this, THREE);
