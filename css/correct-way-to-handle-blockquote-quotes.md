```scss
.wys-Quote {
  quotes: '\201C' '\201D' '\2018' '\2019';
}

.wys-Quote_Quote {
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
}
```
