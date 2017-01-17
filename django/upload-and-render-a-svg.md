**model.py**
```python
svg = FileRefField(
    blank=True,
    null=True,
)
```

**templatetag.py**
```python
@library.global_function
def render_svg(obj):
    return mark_safe(obj.file.read())
```
