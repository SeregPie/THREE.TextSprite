# THREE.TextSprite

`class THREE.TextSprite extends THREE.Sprite`

An instance of `TextSprite` automatically computes the optimal font size depending on the distance to the camera and the size of the renderer canvas.

## demo

[Try it out!](https://seregpie.github.io/THREE.TextSprite/)

## dependencies

- [THREE](https://github.com/mrdoob/three.js)
- [THREE.TextTexture](https://github.com/SeregPie/THREE.TextTexture)

## setup

Install the [package](https://www.npmjs.com/package/three.textsprite) via npm.

```sh

npm install three.textsprite

```

---

Include the code in your page via a CDN.

```html

<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/three.texttexture"></script>
<script src="https://unpkg.com/three.textsprite"></script>

```

Include [polyfills](https://polyfill.io/) to support older browsers.

```html

<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

```

## members

`.constructor({textSize, redrawInterval, roundFontSizeToNearestPowerOfTwo, maxFontSize, texture, material})`

| argument | description |
| ---: | :--- |
| `texture` | The parameters to pass to the constructor of [`TextTexture`](https://github.com/SeregPie/THREE.TextTexture). |
| `material` | The parameters to pass to the constructor of [`SpriteMaterial`](https://threejs.org/docs/index.html#api/materials/SpriteMaterial). |

```js

let sprite = new THREE.TextSprite({
  textSize: 10,
  redrawInterval: 250,
  texture: {
    text: 'Carpe Diem',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  material: {
    color: 0xffbbff,
    fog: true,
  },
});
scene.add(sprite);

```

---

`.isTextSprite = true`

Used to check whether this is an instance of `TextSprite`.

You should not change this, as it is used internally for optimisation.

---

`.textSize = 1`

The size of the text.

---

`.redrawInterval = 1`

The minimum time that must elapse before the canvas is redrawn. If 0, the canvas is redrawn immediately whenever `TextSprite` is rendered, otherwise the redrawing is deferred.

---

`.roundFontSizeToNearestPowerOfTwo = true`

If `true`, the calculated font size will be rounded to the nearest power of 2.

---

`.maxFontSize = Infinity`

The maximum font size.

---

`.dispose()`

Disposes the texture and the material.
