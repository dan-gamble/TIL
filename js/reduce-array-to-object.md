```javascript
const data = this.inputs.reduce((previousValue, currentValue, currentIndex) => {
  previousValue[currentValue.getAttribute('name')] = currentValue

  return previousValue
}, {})
```

The 2nd argument (L6, {}) is the default `previousValue`
