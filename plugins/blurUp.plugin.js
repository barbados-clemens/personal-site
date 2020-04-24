// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-images/src/index.js

const https = require('https');
const sharp = require('sharp');
const jsdom = require("jsdom")
const {JSDOM} = jsdom

const imgToTest = "https://media.calebukle.com/uploads/buck-ai-predict.png";


const html = `
<!doctype html>
<html lang="en">
<head>
  <base href="/">
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="icon" type="image/x-icon" href="https://calebukle.com/favicon.ico">
  <meta name="theme-color" content="#4687F6"/>
  <title>Media | Caleb Ukle</title>
  <meta name="description" content="Check out this image">
  <meta property="og:title" content="Media by Caleb Ukle">
  <meta property="og:description" content="Check out this image">
  <meta property="og:url" content="#{MEDIA_URL}">
  <meta property="og:image" content="#{MEDIA_URL}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:creator" content="@CU_Galaxy">
  <meta name="twitter:title" content="Media by Caleb Ukle">
  <meta name="twitter:image" content="#{MEDIA_URL}">
  <meta name="twitter:description" content="Check out this image">
  <link rel="sitemap" type="application/xml" href="https://calebukle.com/sitemap.xml">
  </head>
<body>
    <p _ngcontent-gti-c21="">
    <img src="https://media.calebukle.com/uploads/buck-ai-predict.png" alt="Image Object Detection" _ngcontent-gti-c21="">
    </p>
</body>
</html>
`;


/**
 *
 * @param {string} url
 * @return {Promise<string>}
 */
async function download(url) {
  return new Promise((res, rej) => {
    https.get(url, (resp) => {
      resp.setEncoding('binary');
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      })

      resp.on('end', () => {
        res(data);
      })
    })
      .on('error', (err) => rej(err))
  })
}

async function newImgMarkUp(imgUrl, caption) {

  console.log('downloading')
  const buf = await download(imgUrl)

  // console.log(buf);
  console.log('resizing')
  const resized = await sharp(buf)
    .resize(20)
    .toBuffer()


  console.log('making base 64 image')
  const b64 = Buffer.from(resized).toString('base64')

  console.log('getting metadata');
  const {height, width} = await sharp(resized)
    .metadata();

  const paddingBottom = (height / width) * 100;

  const markup = `
    <span
    class="img-wrapper"
      style="padding-bottom: ${paddingBottom}%;
             position: relative;
             bottom: 0;
             left: 0;
             display: block;
             background-size: cover;
             background-image: url('data:image/png; base64, ${b64}');"
    >

    <img class="img-sharp"
        src="'data:image/png; base64, ${b64}'"
        alt="${caption}"
        title="${caption}"
        srcset="${imgUrl}"
        sizes="1080"
        style="width: 100%;
               height: 100%;
               margin: 0;
               vertical-align: middle;
               position: absolute;
               top: 0;
               left: 0;"
        />
</span>
  `

  return markup;
}


const script = `
<script>
  const imageWrappers = document.querySelectorAll(\`.img-wrapper\`)

  for (let i = 0; i < imageWrappers.length; i++) {
    const imgWrap = imageWrappers[i];

    const imgEl = imgWrap.querySelector('img');

    const onImageComplete = () => {
      imgEl.style.opacity = 1;
      imgEl.style.filter = null;
      imgEl.style.color = \`inherit\`
      imgEl.style.boxShadow = \`inset 0 0 0 400px white\`
      imgEl.removeEventListener('load', onImageLoad)
      imgEl.removeEventListener('error', onImageComplete)
    }

    const onImageLoad = () => {
      imgEl.style.transition = \`opacity .4s cubic-bezier(0.4, 0.0, 0.2, 1)\`;

      onImageComplete()
    }

    imgEl.style.opacity = 0;
    imgEl.style.filter = \`blur(50px)\`;
    imgEl.style.transform = \`scale(1)\`;
    imgEl.addEventListener('load', onImageLoad)
    imgEl.addEventListener('error', onImageComplete)

    if (imgEl.complete) {
      onImageComplete()
    }
  }
</script>
`;

async function go() {

  const dom = new JSDOM(html);
  const { window } = dom
  const imgs = window.document.querySelectorAll('img');

  console.log(imgs.length);
  for (let i = 0; i < imgs.length; i++) {

    const mediaUrl = imgs[i].src;
    const caption = imgs[i].alt || 'Media by Caleb Ukle';
    console.log(mediaUrl, caption);
    const markup = await newImgMarkUp(mediaUrl, caption);

    imgs[i].replaceWith(markup);
  }

  dom.appendChild(script);
  const t = dom.serialize();
  console.log(t)

  fs.writeFile('test.html', t, err => {
    if (!!err)
      console.error(err);
  })

}


go()
  .then(r => console.log('done'))
  .catch(e => console.error('broke', e))
