```javascript
const eventListenerFnc = (event) => {
  if ('condition' === true) {
    event.target.removeEventListener('transitionend', arguments.callee, false)
  }
}
el.addEventListener('transitionend', eventListenerFnc)
```
