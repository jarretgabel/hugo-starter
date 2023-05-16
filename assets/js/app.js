import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import Polyfills from "./common/Polyfills"
import Intro from './components/Intro'
import Utils from './common/Utils'

window.ESPN = window.ESPN || {}

class App {

	constructor () {
    this.kickoff()
	}

  kickoff() {
    Utils.replaceLogos()

    new Intro()
  }
}

window.onunload = () => {
  window.scrollTo(0, 0)
}

document.addEventListener('DOMContentLoaded', event => {
  if (document.fonts) {
    document.fonts.ready.then(() => {
      window.ESPN.App = new App()
    })
  } else {
    window.ESPN.App = new App()
  }
})
