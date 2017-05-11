From: http://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class/33859264#33859264

TL;DR the `.bind()` creates a new instance of the function every time so the function we are passing to `removeEventListener` is different to the one we use in `addEventListener` unless we use a `funcHandler`

```
class Test {
  constructor () {
    this.funcHandler = this.func.bind(this)
    
    window.addEventListener('scroll', this.funcHandler)
    window.removeEventListener('scroll', this.funcHandler)
  }
}
