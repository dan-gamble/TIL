**HTML**
```jinja
<div class="car-Carousel js-Carousel">
  <div class="car-Carousel_Items js-Carousel_Slides">
    {% for slide in slides %}
      <div class="car-Carousel_Item js-Carousel_Slide" data-slide-index="{{ loop.index0 }}">
        ...
      </div>
    {% endfor %}
  </div>

  <div class="car-Carousel_Controls js-Carousel_Controls">
    <button class="car-Carousel_Control car-Carousel_Control-prev js-Carousel_Prev"></button>
    <button class="car-Carousel_Control car-Carousel_Control-next js-Carousel_Next"></button>
  </div>
  
  <div class="car-Carousel_Dots js-Carousel_Dots">
    {% for slide in slides %}
      <button class="car-Carousel_Dot js-Carousel_Dot" data-slide-index="{{ loop.index0 }}"></button>
    {% endfor %}
  </div>
</div>
```

**Javascript**
```javascript
export class Carousel {
  constructor ({ el }) {
    this.className = `.js-TestimonialCarousel`
    this.els = {
      el,
      itemsWrapper: el.querySelector(`${this.className}_Items`),
      items: el.querySelectorAll(`${this.className}_Item`),
      pagination: {
        wrapper: el.querySelectorAll(`${this.className}_Pagination`),
        prev: el.querySelectorAll(`${this.className}_PrevControl`),
        next: el.querySelectorAll(`${this.className}_NextControl`)
      },
      dots: {
        wrapper: el.querySelectorAll(`${this.className}_Dots`),
        items: el.querySelectorAll(`${this.className}_Dot`),
      }
    }

    this.cycle = new Cycler(Array.from({ length: this.els.items.length }).map((_, index) => index))
    this.currentIndex = this.cycle.current()

    this.setupCarousel()
    this.setupListeners()
  }

  setupListeners () {
    Array.from(this.els.pagination.next).forEach(el => {
      el.addEventListener('click', () => {
        this.currentIndex = this.cycle.next()
      })
    })

    Array.from(this.els.pagination.prev).forEach(el => {
      el.addEventListener('click', () => {
        this.currentIndex = this.cycle.prev()
      })
    })

    Array.from(this.els.dots.items).forEach(dot => {
      dot.addEventListener('click', () => {
        this.cycle.set(Number(dot.dataset.slideIndex))
        this.currentIndex = this.cycle.current()
      })
    })
  }

  setupCarousel () {
    this.carouselHeight = this.getCarouselHeight()
  }

  getCarouselHeight () {
    return Array.from(this.els.items).reduce((acc, item) => {
      acc = item.offsetHeight > acc ? item.offsetHeight : acc

      return acc
    }, 0)
  }

  get carouselHeight () {
    return this._carouselHeight
  }

  set carouselHeight (val) {
    this._carouselHeight = val

    this.els.itemsWrapper.style.height = this._carouselHeight > 0
      ? `${this._carouselHeight}px`
      : ''
    this.els.itemsWrapper.classList.toggle(
      `${this.className.substring(1)}_Items-sized`,
      this._carouselHeight > 0
    )
  }

  get currentIndex () {
    return this._currentIndex
  }

  set currentIndex (val) {
    this._currentIndex = val

    Array.from(this.els.items).map((el, index) => {
      el.setAttribute('aria-current', String(this._currentIndex === index))
    })
  }
}
```
