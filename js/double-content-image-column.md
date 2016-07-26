When using the DoubleContent section type we tend to have 2 WYSIWYG's so the user can choose which side they want their image. Responsively we tend to always have the image first regardless of what column the image is in.

This helps us check for which column that is and apply the relevant class name to aid putting the image first on mobile.

```javascript
const doubleContentSections = document.querySelectorAll('.sec-DoubleContent')

export function doubleContentImages () {
  // If there are no doubleContentSections then no need to run
  if (!doubleContentSections.length) return

  for (const section of doubleContentSections) {
    const wysiwygs = section.querySelectorAll('.wys-WYSIWYG')

    // There are 2 WYSIWYG's per double content section
    for (const wysiwyg of wysiwygs) {
      // We want to find a WYSIWYG that has just an image inside it
      const image = wysiwyg.querySelector('img')

      // There's no image, bye bye
      if (!image) {
        continue
      }

      /*
      We found an image but we want to make sure the WYSIWYG has just an image in it, we'll go
      through all the childNodes of the WYSIWYG and delete nodes that have no content. We could
      end up with some of these because of user input in the admin
      */
      for (const node of wysiwyg.childNodes) {
        if (!node.hasChildNodes()) image.parentNode.parentNode.removeChild(node)
      }

      // Finally if we've found what we want, apply our class
      if (image.parentNode.parentNode.childNodes.length === 1) {
        wysiwyg.parentNode.classList.add('sec-DoubleContent_Column-image')
      }
    }
  }
}
```
