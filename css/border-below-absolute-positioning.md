Given this CSS:

```scss
.sec-HeroWithCards_Filters {
  position: relative;
  z-index: 1;

  margin-top: vrb(4);
  padding: vrb(2) calc(var(--Grid_Gutter) * 2);

  background-color: #fff;
  border: 1px solid red;
  border-radius: 1px;

  &::after {
    content: '';

    position: absolute 50% -500px -1px;
    z-index: -1;

    background-color: #fff;
  }
}
```

To produce this:
![broken](https://i.imgur.com/PihBZql.png)

We clearly have the problem where the `::after` is going above the border.

#Fix

Just change `border` to `outline` and voila:
![fixed](https://i.imgur.com/aAbn9T7.png)
