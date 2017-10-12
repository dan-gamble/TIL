From: https://stackoverflow.com/a/32120668/1633113

**My use case**
```javascript
this.items.map(item => {
  item.link.addEventListener('touchend', e => {
    if (item.hasChildren && !this.isSwiping) {
      e.preventDefault()

      item.el.classList.add('nav-Main_Item-active')
    }
  })
  item.link.addEventListener('touchmove', e => {
    this.isSwiping = true
  })
  item.link.addEventListener('touchstart', e => {
    this.isSwiping = false
  })
})
```
