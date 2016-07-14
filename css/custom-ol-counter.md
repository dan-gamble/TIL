This would allow the numbers to be in their own "column" so the text doesn't wrap underneath

```css
ol {
  counter-reset: section;
  list-style: none;

  li {
    display: flex;

    &::before {
      content: counter(section);
      counter-increment: section;
    }
  }
}
```
