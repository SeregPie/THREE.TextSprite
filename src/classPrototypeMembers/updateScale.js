import Promise_try from '../core/Promise/try';

export default function() {
	return Promise_try(() => {
		let {
			fontSize,
			material,
			scale,
		} = this;
		let {map} = material;
		let {
			height,
			image,
		} = map;
		height *= fontSize;
		return Promise_try(() => map.redraw()).then(() => {
			scale.set(image.width / image.height, 1, 1).multiplyScalar(height);
		});
	});
}

/*export default async function() {
	let {
		fontSize,
		material,
		scale,
	} = this;
	let {map} = material;
	let {
		height,
		image,
	} = map;
	height *= fontSize;
	await map.redraw();
	scale.set(image.width / image.height, 1, 1).multiplyScalar(height);
}*/
