class Utils {

  // Dispatch custom event
  static dispatch(event, payload) {
    var customEvent = new CustomEvent(event, { detail: payload })
    document.dispatchEvent(customEvent)
  }

  // Shuffle
  static shuffle(array) {
    let counter = array.length
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter)

      counter--

      let temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    return array
  }

  /**
   * Is touch device
   * @return {Boolean}
   */
  static isTouchDevice() {
    return "ontouchstart" in document.documentElement
  }

  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))
  }

  static getIndex(collection, target) {
    return [].indexOf.call(collection, target)
  }

  static getArrayFromNodeList(nodelist) {
    // return [].slice.call(nodelist)
    return Array.from(nodelist)
  }

  static getURLVariable (search) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get(search)
  }

  getValueBetweenByPercent (opts) {
    const { start, end, percent } = opts

    return start + (end - start) * percent
  }

  static abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
    number = Number(number)
    forceLetter = forceLetter || false
    if(forceLetter !== false) {
      return this.annotate(number, maxPlaces, forcePlaces, forceLetter)
    }
    var abbr
    if(number >= 1e12) {
      abbr = 't'
    }
    else if(number >= 1e9) {
      abbr = 'b'
    }
    else if(number >= 1e6) {
      abbr = 'm'
    }
    else if(number >= 1e3) {
      abbr = 'k'
    }
    else {
      abbr = ''
    }
    return this.annotate(number, maxPlaces, forcePlaces, abbr)
  }

  static annotate(number, maxPlaces, forcePlaces, abbr) {
    // set places to false to not round
    var rounded = 0
    switch(abbr) {
      case 't':
        rounded = number / 1e12
        break
      case 'b':
        rounded = number / 1e9
        break
      case 'm':
        rounded = number / 1e6
        break
      case 'k':
        rounded = number / 1e3
        break
      case '':
        rounded = number
        break
    }
    if(maxPlaces !== false) {
      var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
      if(test.test(('' + rounded))) {
        rounded = rounded.toFixed(maxPlaces)
      }
    }
    if(forcePlaces !== false) {
      rounded = Number(rounded).toFixed(forcePlaces)
    }
    return rounded + abbr
  }

  /**
   * add commas
   */
  static addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  /**
   * Get browser
   */
  static getBrowser() {
    var ua = navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []
        return {name:'IE',version:(tem[1]||'')}
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]}}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?']
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1])}

    let version = M[1].indexOf(" ") > -1 ? M[1].slice(0, M[1].indexOf(" ")) : M[1]
    version = version.replace("(", "").replace(")", "").replace("", "").replace("/", "").replace(",", "")

    return {
      name: M[0],
      version: version
    }
  }
  /**
   * debounce
   * @param  {Function} func
   * @param  {Number} wait
   * @param  {Boolean} immediate
   * @return {Function}
   */
  static debounce(func, wait, immediate) {
    let timeout
    return () => {
      let context = this, args = arguments
      let later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      let callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  /**
   * Create SVG
   * @param  {Object} opts configuration
   * @return {SVG}
   */
  static createSVG(opts) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", opts.type)
    if(opts.type === "text") {
      var anchor = "middle"
      if(opts.anchor) {
        anchor = opts.anchor
      }
      var alignment = "auto"
      if(opts.alignment) {
        alignment = opts.alignment
      }
      svg.setAttribute("x", opts.x)
      svg.setAttribute("y", opts.y)
      svg.setAttribute("text-anchor", opts.anchor)
      svg.setAttribute("alignment-baseline", alignment)
    } else if(opts.type === "line") {
      svg.setAttribute("x1", opts.x1)
      svg.setAttribute("y1", opts.y1)
      svg.setAttribute("x2", opts.x2)
      svg.setAttribute("y2", opts.y2)

      if(opts.style === "dotted") {
        svg.setAttribute("stroke-dasharray", "1, 2")
        svg.setAttribute("stroke-width", "1")
      }
    } else if(opts.type === "path") {
      svg.setAttribute("d", opts.d)
    } else if(opts.type === "circle") {
      svg.setAttribute("cx", opts.cx)
      svg.setAttribute("cy", opts.cy)
      svg.setAttribute("r", opts.r)
    }

    if(opts.className) {
      svg.setAttribute("class", opts.className)
    }

    if(opts.caption) {
      svg.textContent = opts.caption
    }

    return svg
  }

  static addCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  static translateRange(opts) {
    const { currentRange, newRange, input } = opts

    // current
    // currentRange = {
    //   min: 0,
    //   max: 50000
    // }

    // new
    // newRange = {
    //   min: 0,
    //   max: 100
    // }

    const percent = (input - currentRange.min) / (currentRange.max - currentRange.min)
    const outputX = percent * (newRange.max - newRange.min) + newRange.min

    return outputX
  }

  static replaceLogos() {
    const twitter = document.querySelector('#toolbar .twitter')
    const facebook = document.querySelector('#toolbar .facebook')
    const logo = document.querySelector('#toolbar .logo a')

    if (facebook) {
      facebook.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M297.77 197.22L386.15 197.22 386.15 283.32 297.77 283.32 297.77 484.24 209.38 484.24 209.38 283.32 121 283.32 121 197.22 209.38 197.22 209.38 159.9C209.38 125.46 221.17 82.41 241.79 59.44 265.36 36.48 291.88 25 324.29 25L386.15 25 386.15 111.11 324.29 111.11C309.55 111.11 297.77 122.59 297.77 136.94L297.77 197.22Z"/></svg>'
    }

    if (twitter) {
      twitter.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M443.152659 163.439478C443.152659 296.150277 346.165187 449.140808 168.813855 449.140808 114.333931 449.140808 63.6761742 432.519036 21 404.001578 28.5600203 404.938016 36.2184052 405.420867 43.9892068 405.420867 89.208808 405.420867 130.760816 389.355105 163.727001 362.461781 121.556702 361.642398 85.9346728 332.642089 73.6672048 292.75569 79.5409753 293.896974 85.5974228 294.511511 91.7943911 294.511511 100.619099 294.511511 109.148713 293.3117 117.22866 291.029133 73.1051215 281.767177 39.8719467 241.207714 39.8719467 192.527578L39.8719467 191.283872C52.8701229 198.804638 67.7653302 203.325877 83.5458188 203.867255 57.6759351 185.826195 40.6448112 155.128592 40.6448112 120.260915 40.6448112 101.883322 45.380363 84.6177499 53.7132478 69.781063 101.251443 130.561731 172.340927 170.506657 252.465901 174.705996 250.83586 167.34618 249.992735 159.708359 249.992735 151.807164 249.992735 96.3817502 293.14668 51.461998 346.39002 51.461998 374.142883 51.461998 399.197746 63.6064261 416.790953 83.139934 438.740306 78.6186951 459.368763 70.2639138 478.029928 58.7779185 470.82121 82.2034962 455.518492 101.883322 435.620743 114.305756 455.139086 111.862238 473.687834 106.506984 491 98.5033672 478.072084 118.666044 461.729512 136.326676 442.871618 150.446403 443.082399 154.762796 443.152659 159.123085 443.152659 163.439478Z"/></svg>'
    }

    if (logo) {
      logo.innerHTML = '<svg viewBox="0 0 50 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.30498,1.00003611 C14.4424792,0.997573388 13.2090062,1.97819199 13.0354813,3.44455917 C12.9711325,3.98404708 12.9103987,4.46077531 12.9103987,4.46077531 L37.1438769,4.46077531 C37.1438769,4.46077531 37.1894272,4.10357219 37.2248552,3.81685639 C37.4070565,2.33965612 36.7787516,1.00025277 34.4932838,1.00025277 L34.4932838,1.0004261 C34.4932838,1.0004261 17.2868419,1.00108331 16.30498,1 L16.30498,1.00003611 Z M1.51559558,1.00046221 L1.09024262,4.46084031 L12.0801542,4.46084031 L12.5038443,1.00046221 L1.51537868,1.0004911 L1.51559558,1.00046221 Z M38.4062708,1.00046221 L37.9818577,4.46084031 L49.8957895,4.46084031 C49.8957895,4.46084031 49.9102499,4.335682 49.9630305,3.92835777 C50.2529617,1.65701974 48.7859531,1.00046221 47.369556,1.00046221 L38.4062708,1.0004911 L38.4062708,1.00046221 Z M37.8177321,5.77836081 L36.8893737,13.3304695 L40.9997453,13.3290251 L41.9288266,5.77980522 L37.8177321,5.77821637 L37.8177321,5.77836081 Z M45.6263534,5.77836081 L44.6965491,13.3304695 L48.8069207,13.3290251 L49.736002,5.77980522 L45.6263534,5.77821637 L45.6263534,5.77836081 Z M0.929948972,5.77944411 L0,13.3308306 L10.9891886,13.3308306 L11.3940801,10.054904 L4.51287708,10.0541818 L4.68698042,8.64154672 L11.5654359,8.64154672 L11.9175469,5.77966078 L0.930527388,5.77966078 L0.929948972,5.77944411 Z M12.7491652,5.77944411 C12.4476656,7.75034444 13.4353116,8.64133005 14.8350793,8.64133005 C15.5964199,8.64133005 20.395107,8.63916344 20.395107,8.63916344 L20.221582,10.0539651 L12.2242522,10.0546873 L11.8215299,13.330614 C11.8215299,13.330614 20.5281428,13.3335028 20.8809767,13.330614 C21.172354,13.30967 23.2091028,13.2540602 23.9024794,11.5900973 C24.1273389,11.0498872 24.3261694,9.1129306 24.3818421,8.7063286 C24.7021401,6.3447148 23.0652217,5.78161073 21.7760761,5.78161073 C21.065347,5.78161073 14.152548,5.77944411 12.7491652,5.77944411 Z M25.54229,5.77944411 L24.6139316,13.3308306 L28.7221342,13.3308306 L29.3005505,8.64154672 L34.4607478,8.64154672 C35.9241414,8.64154672 36.7107877,7.85564209 36.8568378,6.80021015 C36.9305859,6.26772763 36.9833664,5.77966078 36.9833664,5.77966078 L25.54229,5.77966078 L25.54229,5.77944411 Z" fill-rule="nonzero"></path></svg>'
      logo.style.opacity = 1
    }
  }

  static degreesToRadians (degrees) {
    return degrees / 57.2958
  }

  static radiansToDegrees (radians) {
    return radians * 57.2958
  }

  static rotationsToRadians (rotations) {
    return rotations * 360 / 57.2958
  }

  static convertSecondsToTimecode(seconds, type = 'short') {
    const date = new Date(0)
    date.setSeconds(seconds)

    return type === 'long' ? date.toISOString().substr(11, 8) : date.toISOString().substr(14, 5)
  }
}



export default Utils
