This does require [date-fns](https://date-fns.org/)

```liquid
<div
  class="mhn-Countdown_Countdown"
  data-module="countdown"
  data-countdown-date="{{ section.settings.countdown_date }}" <!-- Should be dd/mm/yyyy format -->
  data-countdown-time="{{ section.settings.countdown_time }}" <!-- Should be hh:mm format -->
>
  <span class="mhn-Countdown_Days" data-el="countdown.days">15</span>
  <span class="mhn-Countdown_Seperator">:</span>
  <span class="mhn-Countdown_Hours" data-el="countdown.hours">06</span>
  <span class="mhn-Countdown_Seperator">:</span>
  <span class="mhn-Countdown_Minutes" data-el="countdown.minutes">10</span>
  <span class="mhn-Countdown_Seperator">:</span>
  <span class="mhn-Countdown_Seconds" data-el="countdown.seconds">10</span>
</div>
```

```javascript
import addHours from 'date-fns/addHours'
import addDays from 'date-fns/addDays'
import addMinutes from 'date-fns/addMinutes'
import differenceInDays from 'date-fns/differenceInDays'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInSeconds from 'date-fns/differenceInSeconds'

import { Module } from './module/module'

// eslint-disable-next-line import/no-default-export
export default class extends Module {
  static methods = ['render']
  static targets = ['days', 'hours', 'minutes', 'seconds']

  setupListeners () {
    super.setupListeners()

    window.setInterval(this.render, 1000)
  }

  render () {
    this.daysEl.style.width = this.daysWidth
    this.daysEl.textContent = this.daysUntilToDate.toString().padStart(this.daysUntilToDate.toString().length, '0')
    this.hoursEl.textContent = this.hoursUntilToDate.toString().padStart(2, '0')
    this.minutesEl.textContent = this.minutesUntilToDate.toString().padStart(2, '0')
    this.secondsEl.textContent = this.secondsUntilToDate.toString().padStart(2, '0')
  }

  get daysWidth () {
    return `${this.daysUntilToDate.toString().length}ch`
  }

  get daysUntilToDate () {
    return differenceInDays(this.toDate, this.now)
  }

  get hoursUntilToDate () {
    return differenceInHours(this.toDate, addDays(this.now, this.daysUntilToDate))
  }

  get minutesUntilToDate () {
    return differenceInMinutes(this.toDate, addDays(addHours(this.now, this.hoursUntilToDate), this.daysUntilToDate))
  }

  get secondsUntilToDate () {
    return differenceInSeconds(this.toDate, addDays(addHours(addMinutes(this.now, this.minutesUntilToDate), this.hoursUntilToDate), this.daysUntilToDate))
  }

  get toDate () {
    const [day, month, year] = this.data.get('date').split('/')

    return new Date(`${month}/${day}/${year} ${this.data.get('time')}`)
  }

  get now () {
    return Date.now()
  }
}
```

Was used to create:

![img](https://i.imgur.com/qEBwR9d.jpg)
