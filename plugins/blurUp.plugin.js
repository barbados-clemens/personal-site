// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-images/src/index.js

const {newImgMarkUp} = require("./blurUp.healper.plugin");

const {registerPlugin} = require("@scullyio/scully")
const {log, yellow} = require("@scullyio/scully")

const jsdom = require("jsdom")
const {JSDOM} = jsdom


/**
 *
 * @param {string} html
 * @return {Promise<string>}
 */
const blurUp = async (html) => {

  const dom = new JSDOM(html);
  const {window} = dom
  const imgs = window.document.querySelectorAll('img');

  log(yellow(`found ${imgs.length} images`));
  for (let i = 0; i < imgs.length; i++) {

    const mediaUrl = imgs[i].src;
    const caption = imgs[i].alt || 'Media by Caleb Ukle';

    const markupAST = await newImgMarkUp(mediaUrl, caption);
    const span = window.document.createElement(markupAST.tagName)
    span.classList.add(markupAST.props.class)
    span.style = markupAST.props.style;


    markupAST.children.forEach((c) => {
      const el = window.document.createElement(c.tagName);
      el.classList.add(c.props.class)
      el.style = c.props.style
      el.src = c.props.src
      el.srcset = c.props.srcset;
      el.alt = c.props.alt
      el.title = c.props.title
      el.sizes = c.props.sizes


      span.appendChild(el);
    })


    imgs[i].replaceWith(span);
  }

  return dom.serialize();
}

const validator = async conf => [];

registerPlugin('render', 'blurUp', blurUp, validator)
module.exports.blurUp = blurUp;

