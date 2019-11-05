# THREE.TextSprite

`class THREE.TextSprite extends THREE.Sprite`

An instance of `TextSprite` automatically computes the optimal font size depending on the distance to the camera and the size of the renderer DOM element.

## demo

[Try it out!](https://seregpie.github.io/aframe-text-sprite/)

## dependencies

- [THREE.TextTexture](https://github.com/SeregPie/THREE.TextTexture)

## setup

### npm

```shell
npm i @seregpie/three.text-sprite
```

### ES module

```javascript
import TextSprite from '@seregpie/three.text-sprite';
```

### browser

```html
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/@seregpie/three.text-texture"></script>
<script src="https://unpkg.com/@seregpie/three.text-sprite"></script>
```

The class is globally available as `THREE.TextSprite`.

## usage

```javascript
let sprite = new THREE.TextSprite({
  fillStyle: '#24ff00',
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 10,
  fontStyle: 'italic',
  text: [
    'Twinkle, twinkle, little star,',
    'How I wonder what you are!',
    'Up above the world so high,',
    'Like a diamond in the sky.',
  ].join('\n'),
});
scene.add(sprite);
```

---

Update the sprite.

```javascript
sprite.fontFamily = 'Arial, Helvetica, sans-serif';
sprite.text = [
  'When this blazing sun is gone,',
  'When he nothing shines upon,',
  'Then you show your little light,',
  'Twinkle, twinkle, through the night.',
].join('\n');
```

## members

### constructor

```
new THREE.TextSprite({
  align: 'center',
  fillStyle: '#fff',
  fontFamily: 'sans-serif',
  fontSize: 1,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  lineGap: 0.15,
  padding: 0.25,
  strokeStyle: '#000',
  strokeWidth: 0,
  text: '',
})
```

| argument | description |
| ---: | :--- |
| `align` | The horizontal text alignment. Possible values are `'center'`, `'left'` and `'right'`. |
| `fillStyle` | The fill color or style. |
| `fontFamily` | The font family. |
| `fontSize` | The font size. |
| `fontStyle` | The font style. |
| `fontVariant` | The font variant. |
| `fontWeight` | The font weight. |
| `lineGap` | The vertical distance between the text lines. The value is relative to the font size. |
| `padding` | The space around the text. The value is relative to the font size. |
| `strokeStyle` | The stroke color or style. |
| `strokeWidth` | The stroke width. The value is relative to the font size. |
| `text` | The text. |

### properties

`.isTextSprite = true`

Used to check whether this is an instance of `TextSprite`.

---

`.text`

`.fontFamily`

`.fontSize`

`.fontWeight`

`.fontVariant`

`.fontStyle`

`.fillStyle`

`.strokeWidth`

`.strokeStyle`

`.align`

`.lineGap`

`.padding`

### methods

`.dispose()`

Disposes the texture and the material.
