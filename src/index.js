import Class from './Class';
import classPrototypeMembers from './classPrototypeMembers';

let {prototype} = Class;

[
	'align',
	'fillStyle',
	'fontFamily',
	'fontStyle',
	'fontVariant',
	'fontWeight',
	'lineGap',
	'padding',
	'strokeStyle',
	'strokeWidth',
	'text',
].forEach(property => {
	Object.defineProperty(prototype, property, {
		get() {
			return this.material.map[property];
		},
		set(value) {
			this.material.map[property] = value;
			this.updateScale();
		},
	});
});

Object.assign(prototype, classPrototypeMembers);

export default Class;
