#### Javascript
```javascript
class FloatingLabels {
  constructor (form) {
    this.activeClass = 'frm-FloatingContainer-active'

    this.form = form
    this.items = Array.from(this.form.querySelectorAll('.frm-FloatingContainer'))
    this.inputs = this.items.map((x) => x.querySelector('input, textarea'))

    this._setupEvents()
  }

  _setupEvents () {
    for (const element of this.inputs) {
      element.addEventListener('focus', this._handleInputFocus.bind(this))
      element.addEventListener('blur', this._handleInputBlur.bind(this))
    }
  }

  _handleInputFocus (event) {
    event.target.closest('.frm-FloatingContainer').classList.add(this.activeClass)
  }

  _handleInputBlur (event) {
    const input = event.target

    if (!input.value) {
      input.closest('.frm-FloatingContainer').classList.remove(this.activeClass)
    }
  }
}

for (const form of document.querySelectorAll('.frm-Form')) {
  new FloatingLabels(form) // eslint-disable-line no-new
}
```

#### HTML
```html
<div class="frm-FloatingContainer">
  <label class="frm-Label" for="{{ input.id_for_label }}">
    {{ input.label }}{% if input.field.required %} *{% endif %}
  </label>

  {{ input }}
</div>
```
