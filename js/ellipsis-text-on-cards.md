Technique for ellipsising card text on fixed height cards.

```js
import _ from 'lodash'

const cards = document.querySelectorAll('.crds-Card')

export default function () {
  // Obviosuly we don't need to do anything if the page has no cards
  if (!cards) return

  for (const card of cards) {
    const body = card.querySelector('.crds-Card_Body')
    const childAction = body.querySelector('.crds-Card_Action')
    const children = childAction ? _.without([...body.children], childAction) : body.children
    const heights = {}

    // The combined height of the children inside the body
    const contentHeight = [...children].reduce((total, next) => {
      let addition = 0
      addition += next.offsetHeight
      const style = getComputedStyle(next)

      if (parseFloat(style.marginBottom) >= 0) addition += parseFloat(style.marginBottom)
      if (parseFloat(style.marginTop) >= 0) addition += parseFloat(style.marginTop)

      // If the nodeName includes a 'h' it will be a title, store this for later
      if (next.nodeName.toLowerCase().includes('h')) {
        heights['title'] = addition
      }

      return total + addition
    }, 0)

    // The height of the content box inside the body
    let allowedHeight = body.clientHeight - (
        parseFloat(getComputedStyle(body).paddingTop) +
        parseFloat(getComputedStyle(body).paddingBottom)
      )

    // If theres a child action we can remove this from the allowed height as it's a constant height
    if (childAction) {
      allowedHeight -= childAction.offsetHeight + parseFloat(getComputedStyle(childAction).marginTop)
    }

    if (contentHeight > allowedHeight) {
      // We need to cut down the text height until it fits then ellipsis it
      let remainingHeight = allowedHeight - heights.title
      const textNode = card.querySelector('.crds-Card_Text')

      while (textNode.offsetHeight > remainingHeight) {
        const words = textNode.innerText.split(' ')
        words.pop()

        textNode.innerHTML = `${words.join(' ')}&hellip;`
      }
    }
  }
}
```
