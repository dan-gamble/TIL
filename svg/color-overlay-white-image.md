From: https://stackoverflow.com/a/32736304/1633113

```html
<svg width="186.66" height="37.332" viewBox="0 0 140 28" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="colorMask1">
      <feFlood flood-color="#3e0d9d" result="flood" />
      <feComposite in="SourceGraphic" in2="flood" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
    </filter>
  </defs>

  <rect x="0" y="0" rx="10" ry="10" width="140" height="28" fill="#f1f2f1"></rect>

  <image xlink:href="//link/to/white/image.png" x="110" y="4" width="20" height="20" filter="url(#colorMask1)" />
</svg>
```
