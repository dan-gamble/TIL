Takes an initial element.

This will:

* set `aria-current="true"` on the currently active pane
* have a mobile select box that acts like the desktop lines
* have the links anchor down to the wanted section with a non JS fallback

```html
<section class="prj-Navigation">
  <div class="prj-Navigation_Placeholder"></div>

  <div class="prj-Navigation_Surround">
    <div class="prj-Navigation_Inner">
      <div class="prj-Navigation_Body">
        <nav class="prj-Navigation_Items">
          <a href="#the-project"
             class="prj-Navigation_Link"
             data-section="the-project"
             aria-current="true">The project
          </a>

          {% if images %}
            <a href="#image-gallery"
               class="prj-Navigation_Link"
               data-section="image-gallery"
               aria-current="false">Image gallery
            </a>
          {% endif %}

          {% if services %}
            <a href="#services-provided"
               class="prj-Navigation_Link"
               data-section="services-provided"
               aria-current="false">Services provided
            </a>
          {% endif %}

          {% if articles %}
            <a href="#recognition"
               class="prj-Navigation_Link"
               data-section="recognition"
               aria-current="false">Recognition
            </a>
          {% endif %}

          <a href="#related-work"
             class="prj-Navigation_Link"
             data-section="related-work"
             aria-current="false">Related work
          </a>
        </nav>

        <div class="prj-Navigation_Small">
          <select class="prj-Navigation_Select">
            <option value="the-project">The project</option>
            
            {% if images %}
              <option value="image-gallery">Image gallery</option>
            {% endif %}
          
            {% if services %}
              <option value="services-provided">Services provided</option>
            {% endif %}
          
            {% if articles %}
              <option value="recognition">Recognition</option>
            {% endif %}
          
            <option value="related-work">Related work</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</section>
```

```javascript
export const stickyNavigation = {
  init ({ el }) {
    this.isTicking = false
    this.lastKnownY = window.scrollY
    this.isOnMobile = window.innerWidth <= mediaBreakpoints.sm

    this.el = el
    this.els = {
      header: document.querySelector('.hd-Header_Bar'),
      surround: this.el.querySelector('.prj-Navigation_Surround'),
      anchorsSurround: this.el.querySelector('.prj-Navigation_Items'),
      anchors: this.el.querySelectorAll('[data-section]'),
      sections: document.querySelectorAll('[data-anchor]'),
      select: this.el.querySelector('.prj-Navigation_Select')
    }
    this.fragmentPairs = this.setupFragmentPairs()

    this.navTriggerPoint = this.getNavTriggerPoint()
    this.activeFragment = this.getActiveFragment()

    this.setupListeners()
    this.onScroll()
  },

  setupListeners () {
    // Where most of the glory happens
    window.addEventListener('scroll', this.onScroll.bind(this))

    // This will handle scrolling to a specific section
    this.els.anchorsSurround.addEventListener('click', e => {
      e.preventDefault()

      const { target } = e

      if (Array.from(this.els.anchors).includes(target)) {
        scrollToY(
          Object.values(this.fragmentPairs).find(obj => obj.els.anchor === target).triggerPoint
        )
      }
    })

    // We'll need to redo all of our trigger points on a window resize
    window.addEventListener('resize', debounce(this.handleWindowResize.bind(this), 200))

    // Handle the "mobile" select
    this.els.select.addEventListener('change', e => {
      scrollToY(
        Object.values(this.fragmentPairs).find(obj => obj.name === e.target.value).triggerPoint
      )
    })
  },

  handleWindowResize () {
    this.isOnMobile = window.innerWidth <= mediaBreakpoints.sm

    this.lastKnownY = window.scrollY
    this.fragmentPairs = this.setupFragmentPairs()

    this.navTriggerPoint = this.getNavTriggerPoint()
    this.activeFragment = this.getActiveFragment()
  },

  onScroll () {
    this.lastKnownY = window.scrollY

    this.requestTick()
  },

  requestTick () {
    if (!this.isTicking) window.requestAnimationFrame(this.updateEl.bind(this))

    // If a rAF is already queued we don't want to call another one
    this.isTicking = true
  },

  updateEl () {
    // Reset the tick so we can capture the next onScroll
    this.isTicking = false

    // Set whether the navigation is fixed or not
    this.els.surround.classList.toggle(
      'prj-Navigation_Surround-fixed',
      this.lastKnownY >= this.navTriggerPoint
    )

    // Do we need to update the current active link?
    const activeFragment = this.getActiveFragment()
    if (activeFragment !== this.activeFragment) this.activeFragment = activeFragment
  },

  getNavTriggerPoint () {
    const offset = getOffsetTop(this.el)

    return this.isOnMobile ? offset - this.els.header.offsetHeight : offset
  },

  setupFragmentPairs () {
    return Array.from(this.els.anchors).reduce((obj, el) => {
      const sectionEl = Array.from(this.els.sections)
        .find(secEl => secEl.dataset.anchor === el.dataset.section)
      const style = window.getComputedStyle(sectionEl)

      obj[el.dataset.section] = {
        name: el.dataset.section,
        els: {
          anchor: el,
          section: sectionEl
        },
        triggerPoint: this.isOnMobile
          ? getOffsetTop(sectionEl) - parseInt(style.marginTop, 10) - this.el.offsetHeight - this.els.header.offsetHeight
          : getOffsetTop(sectionEl) - parseInt(style.marginTop, 10) - this.el.offsetHeight
      }

      return obj
    }, {})
  },

  getActiveFragment () {
    const obj = Object.values(this.fragmentPairs).reverse().find(obj => {
      return obj.triggerPoint <= this.lastKnownY
    })

    return obj ? obj.name : Array.from(this.els.anchors)[0].dataset.section
  },

  get activeFragment () {
    return this._activeFragment
  },

  set activeFragment (val) {
    this._activeFragment = val

    Array.from(this.els.anchors).map(el => {
      el.setAttribute('aria-current', el.dataset.section === val)
    })

    this.els.select.value = val
  }
}
```
