For pagination like:

`« 1 ... 4 5 6 ... 42 »`

`[1, '...', 4, 5, 6, '...', 42]`

```jinja
{% macro pagination(page_obj) %}
  {% if page_obj.has_other_pages() %}
    <nav class="pgn-Pagination">
      {% if page_obj.has_previous() %}
        <div class="pgn-Pagination_Control pgn-Pagination_Control-prev">
          <a href="{{ get_pagination_url(page_obj.previous_page_number()) }}">
            &laquo;
          </a>
        </div>
      {% endif %}

      <div class="pgn-Pagination_Items">
        {% macro item(loop, page) %}
          <div class="pgn-Pagination_Item"
               aria-current="{% if loop.index == page_obj.number %}true{% else %}false{% endif %}">
            <a class="pgn-Pagination_Link" href="{{ get_pagination_url(page) }}">{{ page }}</a>
          </div>
        {% endmacro %}

        {% for page in page_obj.paginator.page_range %}
          {% if loop.first or loop.last or loop.index == page_obj.number %}

            {{ item(loop, page) }}

          {% elif loop.index == page_obj.number - 1 %}

            {% if loop.index != 2 %}
              <div class="pgn-Pagination_Item">
                <button class="pgn-Pagination_Link" type="button" disabled>&hellip;</button>
              </div>
            {% endif %}

            {{ item(loop, page) }}

          {% elif loop.index == page_obj.number + 1 %}

            {{ item(loop, page) }}

            {% if page_obj.paginator.num_pages != page_obj.number + 2 %}

              <div class="pgn-Pagination_Item">
                <button class="pgn-Pagination_Link" type="button" disabled>&hellip;</button>
              </div>

            {% endif %}

          {% elif loop.index < page_obj.number or loop.index > page_obj.number %}

          {% endif %}
        {% endfor %}
      </div>

      {% if page_obj.has_next() %}
        <div class="pgn-Pagination_Control pgn-Pagination_Control-next">
          <a href="{{ get_pagination_url(page_obj.next_page_number()) }}">
            &raquo;
          </a>
        </div>
      {% endif %}
    </nav>

    {% if page_obj.paginator.page_range|length > 20 %}
      <form action="{{ request.get_full_path() }}" class="pgn-Form">
        <input class="pgn-Form_Input" type="text" name="page" value="{{ page_obj.number }}">
      </form>
    {% endif %}
  {% endif %}
{% endmacro %}
```
