Add the HTML snippet somewhere inside the form

Keep track of the site and secret keys somewhere

```python
RECAPTCHA_SITE_KEY = 'myPublicSiteKey'
RECAPTCHA_SECRET_KEY = 'mySecretSekretKey'
```

In the `base.html` add:

```html
<!-- Just before </head> -->
<script src='https://www.google.com/recaptcha/api.js'></script>

<!-- Just before</body> -->
<script>
  (function () {
    if ( typeof window.CustomEvent === "function" ) return false; //If not IE

    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  })();

  function onSubmit (token) {
    var button = document.querySelector('.g-recaptcha')
    button.setAttribute('data-token', token)
    var event = new Event('captcha:success', { bubbles: true })
    button.dispatchEvent(event)
  }
</script>
```

Somewhere inside the form add:

```html
<div class="g-recaptcha" data-sitekey="{{ settings.RECAPTCHA_SITE_KEY }}" data-callback="onSubmit" data-size="invisible"></div>
```

In Javascript track the captcha status
```javascript
this.captchaPassed = false

this.formFocused = this.formFocused.bind(this)
```

Add an event listener that fires as soon as someone focuses something inside the form then fire the recaptcha event in it
```javascript
this.els.form.addEventListener('focusin', this.formFocused)

formFocused () {
  grecaptcha.execute() // eslint-disable-line

  this.els.form.removeEventListener('focusin', this.formFocused)
}
```

Listen for the captchaCallback event we created

```javascript
this.el.addEventListener('captcha:success', e => (this.captchaPassed = true))
```

Remember to not send the form until `this.captchaPassed` is `true`
