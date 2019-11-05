export default function() {
	let {material} = this;
	let {map} = material;
	map.dispose();
	material.dispose();
}
