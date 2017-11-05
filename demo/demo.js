(function() {

	var Array_sample = function(array) {
		return array[Math.floor(Math.random() * array.length)];
	};

	var _randomText = (function() {
		var adjectives = [
			'able', 'bad', 'best', 'better', 'big', 'black', 'certain', 'clear', 'different', 'early',
			'easy', 'economic', 'federal', 'free', 'full', 'good', 'great', 'hard', 'high', 'human',
			'important', 'international', 'large', 'late', 'little', 'local', 'long', 'low', 'major', 'military',
			'national', 'new', 'old', 'only', 'other', 'political', 'possible', 'public', 'real', 'recent',
			'right', 'small', 'social', 'special', 'strong', 'sure', 'true', 'white', 'whole', 'young',
		];

		var nouns = [
			'area', 'book', 'business', 'case', 'child', 'company', 'country', 'day', 'eye', 'fact',
			'family', 'government', 'group', 'hand', 'home', 'job', 'life', 'lot', 'man', 'money',
			'month', 'mother', 'Mr', 'night', 'number', 'part', 'people', 'place', 'point', 'problem',
			'program', 'question', 'right', 'room', 'school', 'state', 'story', 'student', 'study', 'system',
			'thing', 'time', 'water', 'way', 'week', 'woman', 'word', 'work', 'world', 'year',
		];

		return function() {
			return Array
				.from({length: (Math.random() < 1/6) ? 3 : (Math.random() < 1/4) ? 2 : 1}, function() {
					return (Math.random() < 1/4) ? Array_sample((Math.random() < 1/2) ? nouns : adjectives) : Array_sample(adjectives) + ' ' + Array_sample(nouns);
				})
				.join('\n');
		};
	})();

	var _randomFontFamily = (function() {
		var fontFamilyValues = [
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

	var _randomColor = function() {
		return Math.random() * 0xffffff;
	};

	var n = 1;

	var _randomTextSize = function() {
		return (1/32 + Math.random()) * n/2;
	};

	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x000000);
	document.body.appendChild(renderer.domElement);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(75, 1, n/128, 128*n);
	camera.position.set(0, 0, 8*n);

	var redrawInterval = 1;
	var autoRedraw = true;

	var sprites = Array.from({length: 111}, function() {
		var sprite = new THREE.TextSprite({
			textSize: _randomTextSize(),
			redrawInterval: redrawInterval,
			material: {
				color: _randomColor(),
			},
			texture: {
				text: _randomText(),
				fontFamily: _randomFontFamily(),
				autoRedraw: autoRedraw,
			},
		});
		sprite.position
			.set(Math.random(), Math.random(), Math.random())
			.subScalar(1/2)
			.setLength(1 + Math.random())
			.multiplyScalar(2*n);
		scene.add(sprite);
		return sprite;
	});

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.maxDistance = camera.far/2;
	controls.enableDamping = true;
	controls.dampingFactor = 1/8;
	controls.rotateSpeed = 1/4;
	controls.zoomSpeed = 1;
	controls.keyPanSpeed = 1/2;

	var renderScene = function() {
		renderer.setSize(document.body.clientWidth, document.body.clientHeight);
		camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	};

	window.addEventListener('resize', renderScene, false);

	var startToRenderScene = function() {
		setTimeout(function() {
			requestAnimationFrame(startToRenderScene);
		}, 1000/60);
		renderScene();
	};
	startToRenderScene();

	var gui = new dat.GUI();
	(function() {
		var guiFolder = gui.addFolder('texture');
		guiFolder.add({
			text: function() {
				sprites.forEach(function(sprite) {
					sprite.material.map.text = _randomText();
				});
			},
		}, 'text');
		guiFolder.add({
			fontFamily: function() {
				sprites.forEach(function(sprite) {
					sprite.material.map.fontFamily = _randomFontFamily();
				});
			},
		}, 'fontFamily');
		guiFolder.add(Object.defineProperty({}, 'autoRedraw', {
			get: function() {
				return autoRedraw;
			},

			set: function(value) {
				autoRedraw = value;
				sprites.forEach(function(sprite) {
					sprite.material.map.autoRedraw = autoRedraw;
				});
			},
		}), 'autoRedraw');
		guiFolder.open();
	})();
	(function() {
		var guiFolder = gui.addFolder('sprite');
		guiFolder.add({
			textSize: function() {
				sprites.forEach(function(sprite) {
					sprite.textSize = _randomTextSize();
				});
			},
		}, 'textSize');
		guiFolder.add(Object.defineProperty({}, 'redrawInterval', {
			get: function() {
				return redrawInterval;
			},

			set: function(value) {
				redrawInterval = value;
				sprites.forEach(function(sprite) {
					sprite.redrawInterval = redrawInterval;
				});
			},
		}), 'redrawInterval', 0, 2000, 1);
		guiFolder.open();
	})();

})();