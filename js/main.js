class App {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.active = null
      this.card = null

      this.init()
    })
  }

  init() {
    this.initMap()
  }

  initHover(el) {
    const id = el.className.baseVal.match('reg-[0-9]')[0]

    el.addEventListener('mouseover', (e) => {
      this.activate(id)
    })

    el.addEventListener('click', (e) => {
      this.showDetails(id)
    })
  }

  initMap() {
    this.map = document.getElementById('map')
    const btns = this.map.querySelectorAll('.button')

    this.svg = this.map.querySelector('svg')
    this.svg_tags = this.svg.querySelector('#Region_tags')
    this.svg_regions = this.svg.querySelector('#Regiuni')
    this.svg_counties = this.svg.querySelector('#Counties')

    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let id = e.currentTarget.dataset.id
        this.activate(id)
        this.showDetails(id)
      })

      btn.addEventListener('mouseover', (e) => {
        let id = e.currentTarget.dataset.id
        this.activate(id)
      })

      btn.addEventListener('mouseout', (e) => {
        if (this.card == null) this.activate(null)
        else this.activate(this.card.dataset.id)
      })
    })

    this.svg.addEventListener('mouseout', (e) => {
      if (this.card == null) this.activate(null)
      else this.activate(this.card.dataset.id)
    })

    for (let el of this.svg_regions.children) this.initHover(el)
  }

  activate(id) {
    let selector = '.' + id
    // console.log('[activate]', this.active, id)

    if (this.active != null) {
      if (this.active.id === id) return

      this.active.region.classList.remove('is-active')
      this.active.tag.classList.remove('is-active')
      this.active.county.classList.remove('is-active')
      this.active = null
    }

    if (id == null) return

    this.active = {
      id: id,
      region: this.svg_regions.querySelector(selector),
      tag: this.svg_tags.querySelector(selector),
      county: this.svg_counties.querySelector(selector),
    }

    this.active.region.classList.add('is-active')
    this.active.tag.classList.add('is-active')
    this.active.county.classList.add('is-active')
  }

  showDetails(id) {
    let card = this.map.querySelector('.card[data-id=' + id + ']')
    // console.log('[showDetails]', card, id)

    if (this.card != null) {
      this.card.classList.remove('is-active')
    }

    if (this.card != card) {
      this.card = card
      card.classList.add('is-active')
    } else {
      this.card = null
      this.activate(null)
    }
  }
}

export default new App()
