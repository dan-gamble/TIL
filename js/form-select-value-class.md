Adds a class if the select has a value. I imagine this is used by designers as it looks similar to `<input>`'s placeholder

```javascript
export function handleSelectChange (el) {
  handleSelectClass(el)

  el.addEventListener('change', handleSelectClass)
}

function handleSelectClass (el) {
  // If the el is an Event re-assign it to the target node
  if (el.target) {
    el = el.target
  }

  const hasValueClass = 'frm-Select-hasValue'
  const hasValue = el.value !== ''

  if (hasValue) {
    if (!el.classList.contains(hasValueClass)) {
      el.classList.add(hasValueClass)
    }
  } else {
    if (el.classList.contains(hasValueClass)) {
      el.classList.remove(hasValueClass)
    }
  }
}
```
