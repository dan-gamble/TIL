```javascript
export class StickyNavigation {
  constructor () {
    this.els = {
      header: document.querySelector('.hd-Header'),
      quickLinks: document.querySelector('.qlb-QuickLinksBar'),
      site: document.querySelector('.lyt-Site')
    }
    this.lastKnownScrollY = 0
    this.offsetTrackedY = 0
    this.scrollDirection = undefined
    this.isTicking = false
    this.offset = 50

    this._setupInitial()
    this._setupListeners()

    // Fire the onScroll event so we can capture initial values
    this._onScroll()
  }

  _setupListeners () {
    // https://www.html5rocks.com/en/tutorials/speed/animations/
    window.addEventListener('scroll', this._onScroll.bind(this), {
      passive: true
    })
  }

  _onScroll () {
    // All we want to do here is set the scrollY, we'll delegate the intensive stuff to rAF to
    // ensure 60 FPS
    const previouslyKnown = this.lastKnownScrollY
    const previousDirection = this.scrollDirection
    this.lastKnownScrollY = window.scrollY
    this.scrollDirection = previouslyKnown < this.lastKnownScrollY ? 'down' : 'up'

    if (previousDirection !== this.scrollDirection) {
      this.offsetTrackedY = this.lastKnownScrollY
    }

    this._requestTick()
  }

  _requestTick () {
    if (!this.isTicking) requestAnimationFrame(this._updateFixed.bind(this))

    // If a rAF is already queued we don't want to call another one
    this.isTicking = true
  }

  _updateFixed () {
    // Reset the tick so we can capture the next onScroll
    this.isTicking = false

    if (window.scrollY > this.els.header.offsetHeight + this.els.quickLinks.offsetHeight) {
      const shouldBeShown = (
        this.lastKnownScrollY <= this.offsetTrackedY - this.offset && this.scrollDirection === 'up' ||
        this.lastKnownScrollY >= this.offsetTrackedY + this.offset && this.scrollDirection === 'up'
      )
      this.els.site.classList.toggle('lyt-Site-showHeader', shouldBeShown)
    } else {
      this.els.site.classList.add('lyt-Site-showHeader')
    }
  }

  _setupInitial () {
    // Initially we want to create a empty element that will sit below the fixes headers to stop
    // the site pushing up
    const placeholder = this.els.placeholder = document.createElement('div')
    placeholder.className = 'hd-Header_Placeholder'
    // We want the placeholder to be the size of the fixed element
    placeholder.style.height = `${this.els.header.offsetHeight + this.els.quickLinks.offsetHeight}px`

    this.els.site.insertBefore(placeholder, this.els.site.firstElementChild)

    this.els.site.style = {
      right: this.els.site
    }
    this.els.site.classList.add('lyt-Site-showHeader', 'lyt-Site-fixedHeader')
  }
}
```
