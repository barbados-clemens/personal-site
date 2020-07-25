const sharp = require('sharp');
const fs = require('fs');


async function resize(img) {
  const fileName = `/Users/calebukle/Desktop/imgs/${Date.now()}.webp`
  console.log(`resizing ${img} as ${fileName}`)
  await sharp(img)
    .resize(300)
    .webp({nearLossless: true})
    .toFile(fileName)
}


[
  // `lofi-1080x1080.jpg`,
  `ost-1080x1080.jpg`,
  // `tweetables-1080x1080.jpg`
]
  .map(f => `/Users/calebukle/Desktop/imgs/${f}`)
  .forEach(f => resize(f))
