Typekit fonts get cached for a year but the initial fetch from `use.typekit.net` doesn't so you get a FOUT every page response. This stores the content of the fetch in localStorage and will inject that onto the page if visiting the page after the initial load. Because the browser can paint this straight away we don't get an extra paint (Where the FOUT comes from)

```html
    <script>
      if (window.localStorage && window.localStorage._tk_cache) {
        document.documentElement.classList.add('wf-active');
        var script = document.createElement('script');
        script.innerHTML = localStorage._tk_cache + ";(function () {var timeout = setTimeout(function () {document.documentElement.classList.remove('wf-active');}, 300); Typekit.load({ async: false, active: function () { clearTimeout(timeout); }});})();";
        document.head.appendChild(script);
      }
      window._tk_onload = function () {
        var req = new XMLHttpRequest()
        req.addEventListener("load", function () {
          window.localStorage._tk_cache = this.responseText;
        });
        req.open("GET", "https://use.typekit.net/{{ TYPEKIT_ID_NUMBER }}.js");
        req.send();
      };
    </script>
    <script async src="https://use.typekit.net/{{ TYPEKIT_ID_NUMBER }}.js"
            onload="Typekit.load({ async: true, loading: window._tk_onload })"></script>
```
