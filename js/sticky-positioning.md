Commonly used for share controls to the side of an article

```javascript
const requiredParam = param => { throw Error(`Parameter ${param} is required`) }

export const ShareBar = {
  init ({ el, anchorEl } = { el: requiredParam('el'), anchorEl: requiredParam('anchorEl') }) {
    Object.assign(this, {
      el,
      anchorEl,
      lastKnownScrollY: 0,
      isTicking: false,
      classes: {
        fixed: 'sb-ShareBar-fixed',
        hidden: 'sb-ShareBar-hidden'
      },
      fixedPoints: {
        start: undefined,
        end: undefined
      },
      positioning: {
        initial: undefined,
        afterBottomingOut: undefined
      },
      offset: 30
    })

    // This will set up all the scrollY tracking points we need
    this._setupPositioning()
    this._setupListeners()

    // Fire the onScroll event so we can position it initially
    this._onScroll()
  },

  _setupPositioning () {
    // This is the absoluted amount we need when it's not fixed
    this.positioning.initial = this.anchorEl.offsetTop - this.el.offsetTop
    // This is the absoluted amount we need if we scroll past the anchorEl
    this.positioning.afterBottomingOut = this.positioning.initial + (this.anchorEl.offsetHeight - this.el.offsetHeight)

    // Apply initial positioning
    this._positionEl('initial')
    // The element should be hidden by default to hide it janking about
    this._unhideEl()

    const rect = this.el.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    const clientTop = document.documentElement.clientTop || document.body.clientTop || 0

    // This is the initial scrollY we go past to make it fixed
    this.fixedPoints.start = Math.round(rect.top + scrollTop - clientTop - this.offset)
    // If we reach this point we will want it to go back to bein
    this.fixedPoints.end = Math.round(
      this.fixedPoints.start + this.anchorEl.offsetHeight - this.el.offsetHeight
    )
  },

  _setupListeners () {
    // https://www.html5rocks.com/en/tutorials/speed/animations/
    window.addEventListener('scroll', this._onScroll.bind(this), {
      passive: true
    })
  },

  _onScroll () {
    // All we want to do here is set the scrollY, we'll delegate the intensive stuff to rAF to
    // ensure 60 FPS
    this.lastKnownScrollY = window.scrollY

    this._requestTick()
  },

  _requestTick () {
    if (!this.isTicking) requestAnimationFrame(this._updateEl.bind(this))

    // If a rAF is already queued we don't want to call another one
    this.isTicking = true
  },

  _updateEl () {
    // Reset the tick so we can capture the next onScroll
    this.isTicking = false

    const classList = this.el.classList

    if (this.lastKnownScrollY > this.fixedPoints.end) {
      if (classList.contains(this.classes.fixed)) classList.remove(this.classes.fixed)

      this._positionEl('afterBottomingOut')
    } else if (this.lastKnownScrollY > this.fixedPoints.start) {
      // We don't want the inline style we set, the top we want is set in the CSS
      this.el.removeAttribute('style')
      classList.add(this.classes.fixed)
    } else {
      if (classList.contains(this.classes.fixed)) classList.remove(this.classes.fixed)

      this._positionEl('initial')
    }
  },

  _unhideEl () {
    if (this.el.classList.contains(this.classes.hidden)) {
      this.el.classList.remove(this.classes.hidden)
    }
  },

  _positionEl (position) {
    this.el.style.top = `${this.positioning[position]}px`
  }
}
```
