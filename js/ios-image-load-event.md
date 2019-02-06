According to this post: https://stackoverflow.com/a/5024181/1633113 we need to do the below to get image load events working on Safari

```javascript
const imageEl = document.getElementById('image_id')
const dummyImage = new Image()
dummyImage.addEventListener('load', myFunction, false)
dummyImage.src = 'http://newimgsource.jpg'
imageEl.src = img.src
```
