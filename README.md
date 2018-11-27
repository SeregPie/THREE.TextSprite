# THREE.TextSprite

`class THREE.TextSprite extends THREE.Sprite`

An instance of `TextSprite` automatically computes the optimal font size depending on the distance to the camera and the size of the renderer canvas.

## demo

[Try it out!](https://seregpie.github.io/THREE.TextSprite/)

## dependencies

- [THREE.TextTexture](https://github.com/SeregPie/THREE.TextTexture)

## setup

### npm

```shell
npm install three.textsprite
```

### ES module

```javascript
import TextSprite from 'three.textsprite';
```

### browser

```html
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/three.texttexture"></script>
<script src="https://unpkg.com/three.textsprite"></script>
```

The class `TextSprite` will be available under the namespace `THREE`.

## members

`.constructor({
  material,
  maxFontSize,
  minFontSize,
  redrawInterval,
  textSize,
  texture,
})`

| argument | description |
| ---: | :--- |
| `material` | The parameters to pass to the constructor of [`SpriteMaterial`](https://threejs.org/docs/index.html#api/materials/SpriteMaterial). |
| `texture` | The parameters to pass to the constructor of [`TextTexture`](https://github.com/SeregPie/THREE.TextTexture). |

```javascript
let sprite = new THREE.TextSprite({
  material: {
    color: 0xffbbff,
    fog: true,
  },
  redrawInterval: 250,
  textSize: 10,
  texture: {
    text: 'Carpe Diem',
    fontFamily: 'Arial, Helvetica, sans-serif',
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

`.minFontSize = 0`

The minimum font size.

---

`.maxFontSize = Infinity`

The maximum font size.

---

`.dispose()`

Disposes the texture and the material.
