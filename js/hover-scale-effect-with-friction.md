```javascript
export default class {
  constructor (el) {
    this.els = {
      el,
      image: getElement('.sec-BlocksItem_Image', { context: el })
    }

    this.lFollowX = 0
    this.lFollowY = 0
    this.x = 0
    this.y = 0
    this.friction = 1 / 20

    this.animate = this.animate.bind(this)

    this.els.el.addEventListener('mousemove', e => {
      const lMouseX = Math.max(
        -100,
        Math.min(
          100,
          this.els.el.offsetWidth / 2 - (e.pageX - getOffsetLeft(this.els.el))
        )
      )
      const lMouseY = Math.max(
        -100,
        Math.min(
          100,
          this.els.el.offsetHeight / 2 - (e.pageY - getOffsetTop(this.els.el))
        )
      )

      this.lFollowX = 20 * lMouseX / 100
      this.lFollowY = 20 * lMouseY / 100
    })

    this.animate()
  }

  animate () {
    this.x += (this.lFollowX - this.x) * this.friction
    this.y += (this.lFollowY - this.y) * this.friction

    const translate = `translate(${this.x}px, ${this.y}px) scale(1.1)`

    this.els.image.style.transform = translate

    window.requestAnimationFrame(this.animate)
  }
}
```
