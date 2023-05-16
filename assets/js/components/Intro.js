import gsap from 'gsap'
import Utils from 'js/common/Utils'

class Intro {
  constructor() {
    this.intro = document.querySelector('.intro')
    this.button = this.intro.querySelector('.intro__button')

    this.scrollHandler()
    this.resizeHandler()
    this.events()
    this.setup()
  }

  setup() {
    this.tm = gsap.timeline()
    this.tm.pause()
  }

  events() {
    gsap.ticker.add(this.tickHandler)
    window.addEventListener('resize', this.resizeHandler)
    document.addEventListener('scroll', this.scrollHandler)
    this.button.addEventListener('click', this.clickHandler)
  }

  clickHandler = () => {
    const opts = {
      scrollTo: this.screen.innerHeight,
      duration: .75,
      ease: 'power3.inOut'
    }

    gsap.to(window, opts)

    Utils.dispatch('ESPN:INTRO:BUTTON:START')
  }

  start = () => {
    this.tm.play()
  }

  scrollHandler = () => {
    this.scrollY = window.scrollY
  }

  tickHandler = () => {
    const percent = Math.max(Math.min(this.scrollY / this.screen.height, 1), 0)

    // TODO: use 0 - 1 value to animate intro
  }

  resizeHandler = () => {
    const { innerWidth, innerHeight } = window

    this.screen = { innerWidth, innerHeight }
  }
}

export default Intro
