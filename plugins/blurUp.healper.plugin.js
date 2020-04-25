const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');
const jsdom = require("jsdom")
const {JSDOM} = jsdom



/**
 *
 * @param {string} url
 */
async function download(url) {
  return axios.get(url, {responseType: "arraybuffer"})
}

async function newImgMarkUp(imgUrl, caption) {

  console.log('downloading')
  const {data} = await download(imgUrl)

  console.log(typeof data)
  if (!data) {
    throw Error('no image found')
  }

  // console.log(buf);
  console.log('resizing')
  const resized = await sharp(data)
    .resize(20)
    .toBuffer()


  console.log('making base 64 image')
  const b64 = Buffer.from(resized).toString('base64')

  console.log('getting metadata');
  const {height, width} = await sharp(resized)
    .metadata();

  const paddingBottom = (height / width) * 100;

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

module.exports.newImgMarkUp = newImgMarkUp
