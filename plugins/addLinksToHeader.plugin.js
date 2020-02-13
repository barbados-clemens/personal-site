const { registerPlugin } = require("@scullyio/scully")
const { log, yellow, green, red, logError } = require("@scullyio/scully/utils/log")
const jsdom = require("jsdom")
const { JSDOM } = jsdom

/**
 *
 * @param html {string}
 * @param route { {route: string}}
 * @returns {Promise<string>}
 */
function addLinksToHeader(html, route) {
  try {
    const dom = new JSDOM(html)
    const { window } = dom

    const headers = window.document.querySelectorAll(`h1, h2, h3, h4, h5`)

    headers.forEach(h => {
      if (!h.id) {
        return
      }
      const link = window.document.createElement(`a`)
      link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"/></svg>`
      link.href = `${route.route}#${h.id}`
      link.title = `Link to this point`

      link.classList.add(`header-link`)
      h.insertAdjacentElement(`afterend`, link)
      log(green(`\tadded link for ${h.id}`))
    })

    return Promise.resolve(dom.serialize())
  } catch (e) {
    logError(`${red("Issue creating header links for")} ${yellow(route.route)}`)
    return Promise.resolve(html)
  }
}

const validator = async conf => []
registerPlugin("render", "addLinksToHeader", addLinksToHeader, validator)

module.exports.addLinkToHeader = addLinksToHeader
