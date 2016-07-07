Function to smoothly scroll to a Y position

```js
function scrollToY(scrollTargetY = 0, speed = 300, easing = 'easeInOutQuint') {
    const scrollY = window.scrollY
    let currentTime = 0

    const time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8))

    const easingEquations = {
      easeOutSine: function (pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function (pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: function (pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

    function tick () {
      currentTime += 1 / 60

      const position = currentTime / time
      const t = easingEquations[easing](position)

      if (position < 1) {
        window.requestAnimationFrame(tick)

        window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t))
      } else {
        window.scrollTo(0, scrollTargetY)
      }
    }

    tick()
  }
```
