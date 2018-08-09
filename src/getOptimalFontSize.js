import {Vector3} from 'three';

let objectWorldPosition = new Vector3();
let cameraWorldPosition = new Vector3();
let objectWorldScale = new Vector3();

export default function(object, renderer, camera) {
	if (renderer.domElement.width && renderer.domElement.height && object.material.map.textLines.length) {
		let distance = object.getWorldPosition(objectWorldPosition).distanceTo(camera.getWorldPosition(cameraWorldPosition));
		if (distance) {
			let heightInPixels = object.getWorldScale(objectWorldScale).y * renderer.domElement.height / distance;
			if (heightInPixels) {
				return Math.round(heightInPixels / object.material.map.imageHeight);
			}
		}
	}
	return 0;
}
