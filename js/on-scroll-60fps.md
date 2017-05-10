```javascript
export default {
  init () {
    this.isTicking = false
    this.lastKnownY = 0

    this.setupListeners()
  },

  setupListeners () {
    window.addEventListener('scroll', this.onScroll.bind(this))
  },

  onScroll () {
    this.lastKnownY = window.scrollY

    this.requestTick()
  },

  requestTick () {
    if (!this.isTicking) requestAnimationFrame(this.updateEl.bind(this))

    // If a rAF is already queued we don't want to call another one
    this.isTicking = true
  },
  
  updateEl () {
    // Reset the tick so we can capture the next onScroll
    this.isTicking = false
    
    // Do fun stuffs here
  }
}
```
