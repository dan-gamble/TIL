Yep.

```liquid
{{ article.published_at | time_tag: '%e~%dth %B %Y' | replace: '~0', '' | replace: '~', '' | replace: '1th', '1st' | replace: '2th', '2nd' | replace: '3th', '3rd' | replace: '11st', '11th' | replace: '12nd', '12th' | replace: '13rd', '13th' }}
```
