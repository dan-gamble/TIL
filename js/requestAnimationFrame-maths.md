```javascript
const startPoint = this.pathLength
const endPoint = 0
const duration = this.timeBetweenSlides
const totalFrames = duration * 60 / 1000
const diffPerFrame = startPoint / totalFrames

const tick = () => {
  if (dot.style.strokeDashoffset > endPoint) {
    dot.style.strokeDashoffset -= diffPerFrame

    requestAnimationFrame(tick)
  } else {
    dot.style.strokeDashoffset = endPoint
  }
}

requestAnimationFrame(tick)
```
