export default function(renderer, scene, camera) {
	let {
		height,
		material,
		scale,
		width,
	} = this;
	let {map} = material;
	if (width && height) {
		scale.setX(width).setY(height);
	} else {
		scale.setX(1).setY(1);
	}
	map.computeAndSetOptimalFontSize(this, renderer, camera, true);
	map.redraw();
}
