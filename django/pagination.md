For pagination like:

(Square brackets denote active item)

`« 1 ... 4 5 [ 6 ] 7 8 ... 42 »`

Covers edge cases like:

###### The index that should be ellipsed is made into a number if it would keep the numbers sequential
`« 1 2 3 4 [ 5 ] 6 7 ... 42 »`

```python
@library.global_function
@library.render_with('pagination/pagination.html')
@jinja2.contextfunction
def render_pagination(context, page_obj, offset=2, pagination_key=None):
    """Renders the pagination for the given page of items."""
    current_page = page_obj.number
    offset_indexes = [x for x in range(current_page - offset, current_page + (offset + 1)) if x >= 1]

    print offset_indexes

    return {
        "request": context["request"],
        "offset_indexes": offset_indexes,
        "offset": offset,
        "page_obj": page_obj,
        "paginator": page_obj.paginator,
        "pagination_key": pagination_key or getattr(page_obj, "_pagination_key", "page")
    }
```

```jinja
{% macro pagination(page_obj) %}
  {% if page_obj.has_other_pages() %}
    <nav class="pgn-Pagination">
      {% if page_obj.has_previous() %}
        {% macro prev_control() %}
          <span class="pgn-Pagination_ControlText">Previous page</span>
  
          <span class="pgn-Pagination_ControlSVG">
            {% include 'arrow-left.svg' %}
          </span>
        {% endmacro %}
  
        <a class="pgn-Pagination_Control pgn-Pagination_Control-prev"
           href="{{ get_pagination_url(page_obj.previous_page_number()) }}"
           rel="prev">
          {{ prev_control() }}
        </a>
      {% else %}
        <button class="pgn-Pagination_Control pgn-Pagination_Control-prev"
                type="submit"
                aria-disabled="true">
          {{ prev_control() }}
        </button>
      {% endif %}
  
      <div class="pgn-Pagination_Items">
        {% macro item(loop, page) %}
          <div class="pgn-Pagination_Item"
               aria-current="{% if loop.index == page_obj.number %}true{% else %}false{% endif %}">
            <a class="pgn-Pagination_Link" href="{{ get_pagination_url(page) }}">{{ page }}</a>
          </div>
        {% endmacro %}
  
        {% for page in page_obj.paginator.page_range %}
          {% if loop.first or loop.last or loop.index in offset_indexes %}
  
            {{ item(loop, page) }}
  
          {% else %}
            
            {# We'll ellipsis the first item before the offset_indexes unless it is the 2nd item #}
            {% if page_obj.paginator.num_pages != page_obj.number - (offset + 1) and page_obj.number - (offset + 1) == loop.index %}
  
              {% if loop.index == 2 %}
  
                {{ item(loop, page) }}
  
              {% else %}
  
                <div class="pgn-Pagination_Item">
                  <button class="pgn-Pagination_Link" type="button" disabled>&hellip;</button>
                </div>
  
              {% endif %}
  
            {# Same as above just on the first index after the offset_indexes #}
            {% elif page_obj.paginator.num_pages != page_obj.number + (offset + 1) and page_obj.number + (offset + 1) == loop.index %}
  
              {% if loop.index == page_obj.paginator.num_pages - 1 %}
  
                {{ item(loop, page) }}
  
              {% else %}
  
                <div class="pgn-Pagination_Item">
                  <button class="pgn-Pagination_Link" type="button" disabled>&hellip;</button>
                </div>
  
              {% endif %}
  
            {% endif %}
  
          {% endif %}
  
        {% endfor %}
      </div>
  
      {% if page_obj.has_next() %}
        {% macro next_control() %}
          <span class="pgn-Pagination_ControlText">Next page</span>
  
          <span class="pgn-Pagination_ControlSVG">
            {% include 'arrow-right.svg' %}
          </span>
        {% endmacro %}
  
        <a class="pgn-Pagination_Control pgn-Pagination_Control-next"
           href="{{ get_pagination_url(page_obj.next_page_number()) }}"
           rel="next">
          {{ next_control() }}
        </a>
      {% else %}
        <button class="pgn-Pagination_Control pgn-Pagination_Control-next"
                type="submit"
                aria-disabled="true">
          {{ next_control() }}
        </button>
      {% endif %}
    </nav>
  {% endif %}
{% endmacro %}
```
