```javascript
function shrink ({ el, start, end, duration = 300, easing = 'easeInOutQuint' }) {
  return new Promise((resolve, reject) => {
    let currentTime = 0
    const time = Math.max(0.1, Math.min(Math.abs(start) / duration, 0.8))

    const easingEquations = {
      easeOutSine (pos) {
        return Math.sin(pos * (Math.PI / 2))
      },
      easeInOutSine (pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1))
      },
      easeInOutQuint (pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5)
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2)
      }
    }

    const tick = () => {
      currentTime += 1 / 60

      const position = currentTime / time
      const t = easingEquations[easing](position)

      if (position < 1) {
        window.requestAnimationFrame(tick)

        el.style.height = `${start - ((start - end) * t)}px`
      } else {
        el.style.height = `${end}px`

        resolve()
      }
    }

    tick()
  })
}

shrink({
  el: document.getElementById('example'),
  start: 0,
  end: 100,
})
```
