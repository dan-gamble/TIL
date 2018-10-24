```javascript
export default class OnScrollSixTFPS {
  constructor () {
    this.isTicking = false
    this.lastKnownY = 0
    
    this.onScroll = this.onScroll.bind(this)
    this.updateEl = this.updateEl.bind(this)

    this.setupListeners()
  }

  setupListeners () {
    window.addEventListener('scroll', this.onScroll)
  }

  onScroll () {
    this.lastKnownY = window.scrollY

    this.requestTick()
  }

  requestTick () {
    if (!this.isTicking) requestAnimationFrame(this.updateEl)

    // If a rAF is already queued we don't want to call another one
    this.isTicking = true
  }
  
  updateEl () {
    // Reset the tick so we can capture the next onScroll
    this.isTicking = false
    
    // Do fun stuffs here
  }
}
```
