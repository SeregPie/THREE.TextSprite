let _sample = function(array) {
	let index = Math.floor(Math.random() * array.length);
	return array[index];
};

let _getRandomText = (function() {
	let adjectives = [
		'able',
		'bad',
		'best',
		'better',
		'big',
		'black',
		'certain',
		'clear',
		'different',
		'early',
		'easy',
		'economic',
		'federal',
		'free',
		'full',
		'good',
		'great',
		'hard',
		'high',
		'human',
		'important',
		'international',
		'large',
		'late',
		'little',
		'local',
		'long',
		'low',
		'major',
		'military',
		'national',
		'new',
		'old',
		'only',
		'other',
		'political',
		'possible',
		'public',
		'real',
		'recent',
		'right',
		'small',
		'social',
		'special',
		'strong',
		'sure',
		'true',
		'white',
		'whole',
		'young',
	];
	
	let nouns = [
		'area',
		'book',
		'business',
		'case',
		'child',
		'company',
		'country',
		'day',
		'eye',
		'fact',
		'family',
		'government',
		'group',
		'hand',
		'home',
		'job',
		'life',
		'lot',
		'man',
		'money',
		'month',
		'mother',
		'Mr',
		'night',
		'number',
		'part',
		'people',
		'place',
		'point',
		'problem',
		'program',
		'question',
		'right',
		'room',
		'school',
		'state',
		'story',
		'student',
		'study',
		'system',
		'thing',
		'time',
		'water',
		'way',
		'week',
		'woman',
		'word',
		'work',
		'world',
		'year',
	];

	return function() {
		return _sample(adjectives) + ' ' + _sample(nouns);
	};
})();

let _getRandomFontFamily = (function() {
	let faces = [
		'Georgia, serif',
		'"Palatino Linotype", "Book Antiqua", Palatino, serif',
		'"Times New Roman", Times, serif',

		'Arial, Helvetica, sans-serif',
		'"Arial Black", Gadget, sans-serif',
		'"Comic Sans MS", cursive, sans-serif',
		'Impact, Charcoal, sans-serif',
		'"Lucida Sans Unicode", "Lucida Grande", sans-serif',
		'Tahoma, Geneva, sans-serif',
		'"Trebuchet MS", Helvetica, sans-serif',
		'Verdana, Geneva, sans-serif',

		'"Courier New", Courier, monospace',
		'"Lucida Console", Monaco, monospace',
	];

	return function() {
		return _sample(faces);
	};
})();

let n = 1;

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, 1, n/128, 128*n);
camera.position.set(0, 0, 6*n);

for (let i = 111; i-- > 0;) {
	let texture = new THREE.TextTexture({
		text: _getRandomText(),
		fontFamily: _getRandomFontFamily(),
		minFilter: THREE.LinearFilter,
	});
	let material = new THREE.SpriteMaterial({
		map: texture,
		color: Math.random() * 0xFFFFFF << 0,
	});
	let sprite = new THREE.Sprite(material);
	sprite.scale
		.setX(texture.aspectRatio)
		.multiplyScalar(1/64 + Math.random())
		.multiplyScalar(n/2);
	let group = new THREE.TextTextureMappingGroup(camera);
	group.position
		.setX(Math.random() - 1/2)
		.setY(Math.random() - 1/2)
		.setZ(Math.random() - 1/2)
		.setLength(1 + Math.random())
		.multiplyScalar(n*2);
	group.add(sprite);
	scene.add(group);
}

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxDistance = camera.far;
controls.enableDamping = true;
controls.dampingFactor = 1/8;
controls.rotateSpeed = 1/4;
controls.zoomSpeed = 1;
controls.keyPanSpeed = 1/2;

let render = function() {
	renderer.setSize(document.body.clientWidth, document.body.clientHeight);
	camera.aspect = document.body.clientWidth / document.body.clientHeight;
	camera.updateProjectionMatrix();
	controls.update();
	renderer.render(scene, camera);
};

window.addEventListener('resize', render, false);

(function animate() {
	requestAnimationFrame(animate);
	render();
})();