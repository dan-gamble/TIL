For pagination like:

`« 1 ... 4 5 6 ... 42 »`

`[1, '...', 4, 5, 6, '...', 42]`

```javascript
items () {
  let pages = [...new Array(this.lastPage).keys()].map(i => i + 1)
  const pagesLength = pages.length

  if (pages.length <= 5) {
    return pages
  }

  if (this.currentPage <= 3) {
    const chunk = pages.slice(0, 5)

    if (pages.length > 6) {
      chunk.push(this.hideManyIndicator)
    }

    chunk.push(pages.length)

    return chunk
  } else if (pagesLength - this.currentPage <= 3) {
    const chunk = pages.slice(pagesLength - 5)

    if (chunk[0] !== 2) {
      chunk.unshift(this.hideManyIndicator)
    }

    chunk.unshift(pages[0])

    return chunk
  } else {
    const chunk = [this.currentPage]
    // Add the 2 pages before the current
    chunk.unshift(pages[pages.indexOf(this.currentPage - 2)], pages[pages.indexOf(this.currentPage - 1)])
    // Add the 2 pages after the current
    chunk.push(pages[pages.indexOf(this.currentPage + 1)], pages[pages.indexOf(this.currentPage + 2)])
    // Check to see if we need the hideManyIndicator
    if (chunk[0] !== pages[1]) {
      // Add the hideManyIndicator
      chunk.unshift(this.hideManyIndicator)
    }

    if (chunk[chunk.length - 1] !== pages[pagesLength - 2]) {
      // Add the hideManyIndicator
      chunk.push(this.hideManyIndicator)
    }

    // Add the first and last items
    chunk.unshift(pages[0])
    chunk.push(pages.slice(-1)[0])
    return chunk
  }
}
```
