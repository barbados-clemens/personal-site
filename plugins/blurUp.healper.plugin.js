const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');
const jsdom = require("jsdom")
const {JSDOM} = jsdom


/**
 *
 * @param {string} url
 * @return {Promise<AxiosResponse<any>>}
 */
async function download(url) {
  console.log('downloading')
  return axios.get(url, {responseType: "arraybuffer"})
}

/**
 * @param {Buffer} data
 * @return {Promise<Buffer>}
 */
async function resize(data) {
  console.log('resizing')
  return sharp(data)
    .resize(20)
    .toBuffer()
}

/**
 *
 * @param {Buffer} data
 * @return {string}
 */
function toBase64(data) {
  console.log('making base 64 image')
  return Buffer.from(data).toString('base64');
}

/**
 *
 * @param {Buffer} data
 * @return {Promise<number>}
 */
async function getImgPadding(data) {
  console.log('getting metadata');
  const {height, width} = await sharp(data)
    .metadata();
  return (height / width) * 100;
}

/**
 *
 * @param {number} paddingBottom
 * @param {string}b64
 * @param {string}caption
 * @param {string}imgUrl
 * @return {{children: [{tagName: string, props: {sizes: string, src: string, alt: string, style: string, title: string, srcset: string, class: string}}], tagName: string, props: {style: string, class: string}}}
 */
function buildAst({paddingBottom, b64, caption, imgUrl} = data) {
  const markup = {
    tagName: 'span',
    props: {
      class: 'img-wrapper',
      style: `padding-bottom: ${paddingBottom}%;
             position: relative;
             bottom: 0;
             left: 0;
             display: block;
             background-size: cover;
             background-image: url('data:image/png;base64,${b64}');`
    },
    children: [
      {
        tagName: 'img',
        props: {
          class: 'img-sharp',
          src: `data:image/png;base64,${b64}`,
          alt: `${caption}`,
          title: `${caption}`,
          srcset: `${imgUrl}`,
          sizes: '1080',
          style: `width: 100%;
                  height: 100%;
                  margin: 0;
                  vertical-align: middle;
                  position: absolute;
                  top: 0;
                  left: 0;`,
        }
      }
    ]
  }
  return markup;
}

async function newImgMarkUp(imgUrl, caption) {

  const {data} = await download(imgUrl)

  if (!data) {
    throw Error('no image found')
  }

  const resized = await resize(data);

  const b64 = toBase64(resized);

  const paddingBottom = await getImgPadding(resized);

  return buildAst({b64, paddingBottom, caption, imgUrl})

}

module.exports.newImgMarkUp = newImgMarkUp
