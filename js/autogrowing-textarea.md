#### Javascript
```javascript
class TextareaGrow {
  constructor (form) {
    this.form = form
    this.textareas = Array.from(this.form.querySelectorAll('.frm-Textarea'))

    this._setupEvents()
  }

  _setupEvents () {
    for (const textarea of this.textareas) {
      const initialHeight = textarea.offsetHeight

      for (const event of ['keyup', 'keydown', 'change']) {
        textarea.addEventListener(event, (e) => {
          console.log(initialHeight)

          if (e.target.clientHeight < e.target.scrollHeight) {
            e.target.style.height = `${e.target.scrollHeight + 1}px`
          }

          if (e.target.value === '') {
            e.target.style.height = `${initialHeight + 1}px`
          }
        })
      }
    }
  }
}

for (const form of document.querySelectorAll('.frm-Form')) {
  new TextareaGrow(form) // eslint-disable-line no-new
}
```
