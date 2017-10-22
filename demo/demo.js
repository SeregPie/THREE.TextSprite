(function() {

	let Array_sample = function(array) {
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
			return Array
				.from({length: (() => {
					if (Math.random() < 1/6) {
						return 3;
					} else
					if (Math.random() < 1/4) {
						return 2;
					} else {
						return 1;
					}
				})()}, () => {
					if (Math.random() < 1/7) {
						return Array_sample(nouns);
					} else
					if (Math.random() < 1/7) {
						return Array_sample(adjectives);
					} else {
						return Array_sample(adjectives) + ' ' + Array_sample(nouns);
					}
				})
				.join('\n');
		};
	})();

	let _randomFontFamily = (function() {
		let fontFamilyValues = [
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
			return Array_sample(fontFamilyValues);
		};
	})();

	let _randomColor = function() {
		return Math.random() * 0xffffff;
	};

	let n = 1;

	let _randomTextSize = function() {
		return (1/32 + Math.random()) * n/2;
	};

	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement);

	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(75, 1, n/128, 128*n);
	camera.position.set(0, 0, 8*n);

	let redrawInterval = 1;
	let autoRedraw = true;

	let sprites = Array.from({length: 111}, () => {
		let sprite = new THREE.TextSprite({
			textSize: _randomTextSize(),
			redrawInterval,
			material: {
				color: _randomColor(),
			},
			texture: {
				text: _randomText(),
				fontFamily: _randomFontFamily(),
				autoRedraw,
			},
		});
		sprite.position
			.set(Math.random(), Math.random(), Math.random())
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

	let renderScene = function() {
		renderer.setSize(document.body.clientWidth, document.body.clientHeight);
		camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	};

	window.addEventListener('resize', renderScene, false);

	let startToRenderScene = function() {
		setTimeout(() => {
			requestAnimationFrame(startToRenderScene);
		}, 1000/60);
		renderScene();
	};
	startToRenderScene();

	let gui = new dat.GUI();

	gui.add({
		text() {
			sprites.forEach(sprite => {
				sprite.material.map.text = _randomText();
			});
		},
	}, 'text');

	gui.add({
		fontFamily() {
			sprites.forEach(sprite => {
				sprite.material.map.fontFamily = _randomFontFamily();
			});
		},
	}, 'fontFamily');

	gui.add({
		get autoRedraw() {
			return autoRedraw;
		},

		set autoRedraw(value) {
			autoRedraw = value;
			sprites.forEach(sprite => {
				sprite.material.map.autoRedraw = autoRedraw;
			});
		},
	}, 'autoRedraw');

	gui.add({
		textSize() {
			sprites.forEach(sprite => {
				sprite.textSize = _randomTextSize();
			});
		},
	}, 'textSize');

	gui.add({
		get redrawInterval() {
			return redrawInterval;
		},

		set redrawInterval(value) {
			redrawInterval = value;
			sprites.forEach(sprite => {
				sprite.redrawInterval = redrawInterval;
			});
		},
	}, 'redrawInterval', 0, 2000).step(1);

})();