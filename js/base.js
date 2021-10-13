// import { tns } from 'tiny-slider/src/tiny-slider'
require('fslightbox')

class App {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initMobileMenu()
      this.initComponents()
    })
  }

  initMobileMenu() {
    const $navbarBurger = document.querySelector('.navbar-burger')

    if ($navbarBurger) {
      $navbarBurger.addEventListener('click', () => {
        const $target = document.getElementById($navbarBurger.dataset.target)

        $navbarBurger.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    }
  }

  initComponents() {
    this.initAllAccordion()
    this.initTabs()
   
    this.initCarousel()
  }

  // initAccordion() {
  //   const $el = document.querySelector('.accordion-widget')
  //   if ($el == undefined) return

  //   const $btns = $el.querySelectorAll('.trigger')

  //   this.accordion = { active: null }

  //   for (let $btn of $btns) {
  //     $btn.addEventListener('click', () => {

  //       console.log("button click on "+$btn.getAttribute("data-anchor").valueOf() )
        
  //       if (this.accordion.active != null) {
  //         this.accordion.active.parentNode.classList.remove('is-active');
  //         console.log('parentNode : '+this.accordion.active.parentNode);
  //       }

  //       if (this.accordion.active != $btn) {
  //         $btn.parentNode.classList.add('is-active')
  //         this.accordion.active = $btn
  //       } else this.accordion.active = null
  //       // window.location.hash = $btn.dataset.anchor
  //     })
  //   }
  // }



  initAllAccordion() {
    const $elem = document.querySelectorAll('.accordion-widget');
    for(let i = 0; i < $elem.length; i++){
      let $el = $elem[i];

      let $btns = $el.querySelectorAll('.trigger')

      this.accordion = { active: null }

      for (let $btn of $btns) {
        $btn.addEventListener('click', () => {

          console.log("button click on "+$btn.getAttribute("data-anchor").valueOf() )
          
          if (this.accordion.active != null) {
            this.accordion.active.parentNode.classList.remove('is-active');
            console.log('parentNode : '+this.accordion.active.parentNode);
          }

          if (this.accordion.active != $btn) {
            $btn.parentNode.classList.add('is-active')
            this.accordion.active = $btn
          } else this.accordion.active = null
          // window.location.hash = $btn.dataset.anchor
        })
      }
    }
  }



  initTabs() {
    const $el = document.querySelector('.tabs-widget')
    if ($el == undefined) return

    const $links = $el.querySelectorAll('.tabs a')
    const $content = $el.querySelectorAll('.tab-content')
    const $tabSelect = $el.querySelector('.tab-select select')

    this.tabs = { active: null }

    const activate = ($link, id) => {
      if (this.tabs.active != null) {
        this.tabs.active.parentNode.classList.remove('is-active')
        document
          .querySelector(this.tabs.active.dataset.href)
          .classList.remove('is-active')
      }

      $link.parentNode.classList.add('is-active')
      document.querySelector(id).classList.add('is-active')

      this.tabs.active = $link
    }

    for (let $link of $links) {
      $link.addEventListener('click', () => {
        activate($link, $link.dataset.href)
      })
    }

    $tabSelect.addEventListener('change', (e) => {
      activate(
        $el.querySelector('.tabs a[data-href="' + $tabSelect.value + '"]'),
        $tabSelect.value
      )
    })

    $links[0].click()
  }

  initCarousel() {
    const $carousels = document.querySelectorAll('.carousel')
    if ($carousels == undefined) return

    this.carousel = []

    for (let $c of $carousels) {
      this.carousel.push(
        tns({
          container: $c,
          // lazyload: true,
          autoWidth: true,
          gutter: 16,
          // edgePadding: 32,
          items: 3,
          loop: false,
          // center: true,
          autoplay: false,
          responsive: {
            '350': {
              items: 1,
              // autoWidth: false,
            },
          },
        })
      )
    }
  }

  initGallery() {
    const $gallery = document.querySelectorAll('.carousel')
    if ($gallery == undefined) return

    this.carousel = []

    for (let $c of $gallery) {
    }
  }
}

export default new App()
