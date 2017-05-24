# THREE.TextSprite

`class THREE.TextSprite extends THREE.Sprite`

...

Try out the [demo](https://seregpie.github.io/THREE.TextSprite/)!

## dependencies

- [THREE](https://github.com/mrdoob/three.js)
- [THREE.TextTexture](https://github.com/SeregPie/THREE.TextTexture)

## members

`.constructor({textSize, redrawDelay, roundFontSizeToNearestPowerOfTwo, maxFontSize, texture, material})`

```javascript

let sprite = new THREE.TextSprite({
  textSize: 10,
  redrawDelay: 250,
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

...

---

`.redrawDelay = 1`

...

---

`.roundFontSizeToNearestPowerOfTwo = true`

...

---

`.maxFontSize = Infinity`

...

---

`.dispose()`

Disposes the texture and the material.
