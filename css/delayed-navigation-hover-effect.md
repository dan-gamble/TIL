# Bad
![Bad hover](http://i.imgur.com/kGwpXE3.gif)

# Good
![Good hover](http://i.imgur.com/q3hG1Bd.gif)

When hovering over navigation items we want to allow for lazy mouse movement like the 2nd gif. We can achieve this easily by just adding a `transition-delay`

```css
  transition: all 0.6s var(--Transition_EaseOutBack);
  transition-delay: 0.5s;

  .nav-Item-hasDropdown:hover & {
    opacity: 1;
    visibility: visible;

    transform: scale(1);
    transition: all 0.3s var(--Transition_EaseOutBack);
  }
```

Voila!
