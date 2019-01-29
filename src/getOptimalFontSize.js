import {Vector3} from 'three';

let objectWorldPosition = new Vector3();
let cameraWorldPosition = new Vector3();
let objectWorldScale = new Vector3();

export default function(object, renderer, camera) {
	if (renderer.domElement.width && renderer.domElement.height && object.material.map.textLines.length) {
		let distance = object.getWorldPosition(objectWorldPosition).distanceTo(camera.getWorldPosition(cameraWorldPosition));
		if (distance) {
                        // Get the height of the view in world units at the depth of the object
                        let vFOV = camera.fov * Math.PI / 180; 
                        let fullHeight = 2 * Math.tan( vFOV / 2 ) * Math.abs( distance );

                        let heightInPixels = (object.getWorldScale(objectWorldScale).y / fullHeight) * renderer.domElement.height;
			if (heightInPixels) {
				return Math.round(heightInPixels / object.material.map.imageHeight);
			}
		}
	}
	return 0;
}
