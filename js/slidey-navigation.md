This was for Owlsone

```javascript
export class Keyline {
  constructor () {
    // This will be our aria-current='true' item or the hovered item
    this.activeItem = undefined
    // This will be the track that the mark will slide across
    this.keylineTrack = undefined
    // The blue mark that appears under the items
    this.keylineMark = undefined

    // Used to help position the track
    this.header = document.querySelector('.hd-Header')
    // Used to help position and a narrower place to look for nodes instead of document
    this.nav = this.header.querySelector('.hd-Nav')
    // This is used to track the index of the `activeItem`
    this.navItems = this.nav.querySelectorAll('.nav-Item')
  }

  init () {
    // Create our keyline track and mark and insert them into the DOM
    this.keyline = this.createKeyline()

    // We'll need to check for mouse events to slide the mark along
    this.setupListeners()
  }

  createKeyline () {
    // Create the track
    this.keylineTrack = document.createElement('div')
    this.keylineTrack.className = 'hd-Nav_KeylineTrack'
    // The positioning of the track is quite complex so this is done in another method
    const itemStyles = this.itemStyles()
    const trackStyles = {
      position: 'absolute',
      top: `calc(100% + ${((this.header.offsetHeight - this.nav.offsetHeight) / 2) - 3}px)`,
      right: `${itemStyles.margin.right + itemStyles.padding.right + this.calculateKeylineRight()}px`,
      left: `${itemStyles.margin.left + itemStyles.padding.left}px`
    }

    Object.assign(this.keylineTrack.style, trackStyles)

    // Create the mark, the mark will be the blue bar that slides across
    this.keylineMark = document.createElement('div')
    this.keylineMark.className = 'hd-Nav_KeylineMark'
    const markStyles = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0
    }

    Object.assign(this.keylineMark.style, markStyles)

    // Insert our mark inside the track
    this.keylineTrack.appendChild(this.keylineMark)

    // We need to get an initial this.activeItem so we can style the mark
    this.findActiveItem()

    // Styles the mark based on this.activeItem
    this.calculateMarkStyle()

    // Finally insert our track and mark into the DOM
    this.nav.appendChild(this.keylineTrack)
  }

  calculateKeylineRight () {
    // Get any buttons on the right and ignore their sizes for the track
    const navigationButtons = this.nav.querySelectorAll('.nav-ButtonLink')
    let right = 0

    for (const button of navigationButtons) {
      const parent = button.parentNode
      right += parent.offsetWidth
    }

    return right
  }

  calculateMarkStyle () {
    const mark = this.keylineMark
    const link = this.activeItem.querySelector('.nav-Link')
    const { offsetWidth: width } = link
    const { paddingRight, paddingLeft } = window.getComputedStyle(link)

    // We want the mark to only be as wide as the text
    mark.style.width = `${width - parseInt(paddingRight, 10) - parseInt(paddingLeft, 10)}px`

    // If the item is the first one we can default this style
    if (this.activeItem === this.navItems[0]) {
      mark.style.transform = `translate3d(0, 0, 0)`
    } else {
      // Otherwise slide our mark to the new activeItem
      const x = this.activeItem.offsetLeft

      mark.style.transform = `translate3d(${x}px, 0, 0)`
    }
  }

  findActiveItem () {
    // This is used only initially to find our start point for the mark
    let activeItem = this.navItems[0]

    for (const item of this.navItems) {
      if (item.getAttribute('aria-current') === 'true') {
        activeItem = item
      }
    }

    this.activeItem = activeItem
  }

  handleHover (e) {
    // If we hover the end button, ignore it
    if (e.target.classList.contains('nav-Item-button')) return

    // Ensure our track is always visible on hover, leaving hides it
    this.keylineTrack.style.opacity = 1

    this.activeItem = e.target
    // We get a new activeItem so let's get the styles for it
    this.calculateMarkStyle()
  }

  handleMouseLeave () {
    // Hide the track when the mouse leaves the nav
    this.keylineTrack.style.opacity = 0
  }

  itemStyles () {
    // All links have the same style so we can just get the first
    const item = this.navItems[0]
    const styles = window.getComputedStyle(item)

    // We only care about the margin and padding as we want the mark size to be the size of the
    // content box without margin & padding
    return {
      margin: {
        right: parseInt(styles.marginRight),
        left: parseInt(styles.marginLeft)
      },
      padding: {
        right: parseInt(styles.paddingRight),
        left: parseInt(styles.paddingLeft)
      }
    }
  }

  setupListeners () {
    // We want to track individual item hovers
    for (const item of this.navItems) {
      item.addEventListener('mouseenter', this.handleHover.bind(this))
    }

    // When we leave the nav as a whole
    this.nav.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
  }
}
```
