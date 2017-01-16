```javascript
export const InViewport = {
  init ({ el, cb, params } = { el: requiredParam('el'), cb: requiredParam('cb') }) {
    Object.assign(this, {
      el,
      cb,
      params: Object.assign({
        container: document.body,
        offset: 0
      }, params)
    })

    this.lastKnownScrollY = 0
    this.isTicking = false
    this.elIsVisible = false

    // This lets us be able to remove the eventListener
    this._onScroll = this._onScroll.bind(this)

    this._setupListeners()
  },

  _setupListeners () {
    if (!this.elIsVisible) {
      window.addEventListener('scroll', this._onScroll, {
        passive: true
      })
    }
  },

  _removeListeners () {
    if (this.elIsVisible) {
      window.removeEventListener('scroll', this._onScroll)
    }
  },

  _onScroll: function onScroll () {
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

    if (this.isVisible()) {
      this.cb(this.el)
      this.elIsVisible = true
      this._removeListeners()
    }
  },

  isVisible () {
    const rect = this.el.getBoundingClientRect()
    const html = document.documentElement
    const viewport = {
      top: -this.params.offset,
      left: -this.params.offset,
      right: html.clientWidth + this.params.offset,
      bottom: html.clientHeight + this.params.offset
    }

    return (
      rect.right >= viewport.left &&
      rect.left <= viewport.right &&
      rect.bottom >= viewport.top &&
      rect.top <= viewport.bottom
    )
  }
}
```
