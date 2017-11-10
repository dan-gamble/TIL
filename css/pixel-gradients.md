If a panel has a split colour you can achieve this with a pixel stopped gradient:

Use an RGBA version of the colour you want instead of `transparent` as some browsers consider `transparent` to be black based instead of white based

```css
.sec-Section {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 768px, #fff 768px, #fff 100%);
}
```
