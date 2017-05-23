(function() {

	let _sample = function(array) {
		return array[Math.floor(Math.random() * array.length)];
	};

	let _randomText = (function() {
		let adjectives = [
			'able', 'bad', 'best', 'better', 'big', 'black', 'certain', 'clear', 'different', 'early',
			'easy', 'economic', 'federal', 'free', 'full', 'good', 'great', 'hard', 'high', 'human',
			'important', 'international', 'large', 'late', 'little', 'local', 'long', 'low', 'major', 'military',
			'national', 'new', 'old', 'only', 'other', 'political', 'possible', 'public', 'real', 'recent',
			'right', 'small', 'social', 'special', 'strong', 'sure', 'true', 'white', 'whole', 'young',
		];

		let nouns = [
			'area', 'book', 'business', 'case', 'child', 'company', 'country', 'day', 'eye', 'fact',
			'family', 'government', 'group', 'hand', 'home', 'job', 'life', 'lot', 'man', 'money',
			'month', 'mother', 'Mr', 'night', 'number', 'part', 'people', 'place', 'point', 'problem',
			'program', 'question', 'right', 'room', 'school', 'state', 'story', 'student', 'study', 'system',
			'thing', 'time', 'water', 'way', 'week', 'woman', 'word', 'work', 'world', 'year',
		];

		return function() {
			return _sample(adjectives) + ' ' + _sample(nouns);
		};
	})();

	let _randomFontFamily = (function() {
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

	let _randomColor = function() {
		return Math.random() * 0xffffff;
	};

	let n = 100;

	let _randomTextSize = function() {
		return (1/32 + Math.random()) * n/2;
	};

	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement);

	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(75, 1, n/128, 128*n);
	camera.position.set(0, 0, 8*n);

	let redrawDelay = 1;

	let sprites = Array.from({length: 111}, () => {
		let sprite = new THREE.TextSprite({
			textSize: _randomTextSize(),
			redrawDelay,
			material: {
				color: _randomColor(),
			},
			texture: {
				text: _randomText(),
				fontFamily: _randomFontFamily(),
			},
		});
		sprite.position
			.setX(Math.random())
			.setY(Math.random())
			.setZ(Math.random())
			.subScalar(1/2)
			.setLength(1 + Math.random())
			.multiplyScalar(2*n);
		return sprite;
	});
	scene.add(...sprites);

	let controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.maxDistance = camera.far/2;
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

	let gui = new dat.GUI();

	gui.add({
		text() {
			sprites.forEach(sprite => {
				sprite.material.map.text = _randomText();
			});
		},
	}, 'text');

	gui.add({
		textSize() {
			sprites.forEach(sprite => {
				sprite.textSize = _randomTextSize();
			});
		},
	}, 'textSize');

	gui.add({
		get redrawDelay() {
			return redrawDelay;
		},

		set redrawDelay(value) {
			redrawDelay = value;
			sprites.forEach(sprite => {
				sprite.redrawDelay = redrawDelay;
			});
		},
	}, 'redrawDelay', 0, 2000).step(1);

	gui.add({
		fontFamily() {
			sprites.forEach(sprite => {
				sprite.material.map.fontFamily = _randomFontFamily();
			});
		},
	}, 'fontFamily');

})();