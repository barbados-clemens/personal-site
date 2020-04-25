// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-images/src/index.js

const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');
const jsdom = require("jsdom")
const {JSDOM} = jsdom

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
    <section _ngcontent-kgd-c21="" class="post-content">
  <p _ngcontent-kgd-c21=""> I've been trying to make and train a custom machine learning model for detecting specific objects in images. After some exploring, I found a massively easy way to do this. Here is my found solution to build, train, and output the model in the desired ML Format!</p>
  <!--scullyContent-begin--><p _ngcontent-kgd-c21=""><img src="https://media.calebukle.com/uploads/buck-ai-predict.png" alt="Image Object Detection" _ngcontent-kgd-c21=""></p>
<blockquote _ngcontent-kgd-c21="">
<p _ngcontent-kgd-c21="">Disclaimer: I am no Machine Learning, Deep Learning, and/or Artificial Intelligence Expert. I take no responsibility if you end up making SkyNet. You've been warned!</p>
</blockquote>
<p _ngcontent-kgd-c21="">Recently, I started tinkering with machine learning via <a href="https://dotnet.microsoft.com/apps/machinelearning-ai/ml-dotnet" _ngcontent-kgd-c21="">ML.NET</a>, Microsofts new library for ML type tasks. It's really nice and I'm super excited about its future. But with it being so new, it is currently not able to help me train a model that will detect objects in images. They have a great tutorial using a pre-trained <a href="https://github.com/onnx/models/tree/master/vision/object_detection_segmentation/tiny_yolov2" _ngcontent-kgd-c21="">TinyYOLOv2</a> model. But no custom models. Thus I set up going through ways to make my own. </p>
<p _ngcontent-kgd-c21="">The most promising method was to use Python to retrain the <a href="https://github.com/onnx/models/tree/master/vision/object_detection_segmentation/tiny_yolov2" _ngcontent-kgd-c21="">TinyYOLOv2</a> model with my image set. Only one issue. I don't really know Python. Sure I could have hacked my way through it, but at the end of the day, I prefer my C# and .NET world. so I kept looking. Finally, I found the best solution for me. </p>
<p _ngcontent-kgd-c21="">Let me introduce you to <a href="https://customvision.ai" _ngcontent-kgd-c21="">custom vision</a>, this is a service run by Microsoft that allows you to... you guessed it, make your own custom object detection models. Yay! 🎉 Exactly what I need and better yet, you can train, test and utilize your model all within this service. Once you're done training and validating you can publish your model and use their REST API to perform predictions, all without having to really worry about anything yourself. If you don't want to use their API, like me, you can just download your model in the desired format you wish with C# and Python generated code ready for consumption. How awesome is that?!</p>
<blockquote _ngcontent-kgd-c21="">
<p _ngcontent-kgd-c21="">"Okay yeah sure that sounds amazing, but what's the catch?" - Probably you</p>
</blockquote>
<p _ngcontent-kgd-c21="">Okay so there is one catch, it costs money. roughly $3 for a quick training session, $2 per 1000 transaction and $20 an hour to train. But for what you're getting I'd argue very much worth the cost. Check out their pricing <a href="https://azure.microsoft.com/en-us/pricing/details/cognitive-services/custom-vision-service/" _ngcontent-kgd-c21="">here</a> </p>
<p _ngcontent-kgd-c21="">So let's walk through how to use the service. </p>
<ol _ngcontent-kgd-c21="">
<li _ngcontent-kgd-c21="">Go to <a href="https://customvision.ai" _ngcontent-kgd-c21="">https://customvision.ai</a></li>
<li _ngcontent-kgd-c21="">Login with an Azure account <ul _ngcontent-kgd-c21="">
<li _ngcontent-kgd-c21="">if you don't have a Microsoft account then you'll need to make one <a href="https://portal.azure.com/" _ngcontent-kgd-c21="">here</a> </li>
</ul>
</li>
<li _ngcontent-kgd-c21="">Click "New Project"</li>
<li _ngcontent-kgd-c21="">Fill out the Name, Description and resource<ul _ngcontent-kgd-c21="">
<li _ngcontent-kgd-c21="">if you need to make a new resource, just follow the onscreen prompts. </li>
<li _ngcontent-kgd-c21="">you can view these resources inside of the <a href="https://portal.azure.com/" _ngcontent-kgd-c21="">Azure Portal</a></li>
</ul>
</li>
<li _ngcontent-kgd-c21="">Select the project type you'd like
 -For me, it was "Object Detection"</li>
<li _ngcontent-kgd-c21="">Select Desired Classification Types<ul _ngcontent-kgd-c21="">
<li _ngcontent-kgd-c21="">Tag would be object</li>
</ul>
</li>
<li _ngcontent-kgd-c21="">Select Domain, I picked <em _ngcontent-kgd-c21="">General (compact)</em></li>
<li _ngcontent-kgd-c21="">Wait for everything to be created</li>
<li _ngcontent-kgd-c21="">Start making your datasets!</li>
</ol>
<p _ngcontent-kgd-c21=""><img src="https://media.calebukle.com/uploads/new-resource-modal.png" alt="New Project Screen" _ngcontent-kgd-c21=""></p>
<p _ngcontent-kgd-c21="">You're all set to go and it's really that easy. </p>
<p _ngcontent-kgd-c21="">I recommend doing a quick train once you have 15 photos marked of each classification or object tag you want to work with. This is a short session that gives you a really rough idea about your model's performance. Also, it's a good way to generate code up to start scaffolding your project if other people are wanting to play around with the model. </p>
<p _ngcontent-kgd-c21=""><img src="https://media.calebukle.com/uploads/custom-ai-metrics.png" alt="After Training Metrics" _ngcontent-kgd-c21=""></p>
<p _ngcontent-kgd-c21="">From my limited internet reading, I've seen a recommendation of about 300 photos per classification you want to detect. which is a lot of photos. More data never hurts in these cases!</p>
<p _ngcontent-kgd-c21="">When you're ready you can do a full training session and limit the amount of training time. This is under <em _ngcontent-kgd-c21="">Advance Training</em> option</p>
<p _ngcontent-kgd-c21=""><img src="https://media.calebukle.com/uploads/train-modal.png" alt="Training Screen" _ngcontent-kgd-c21=""></p>
<p _ngcontent-kgd-c21="">When you're done training either via quick training or advance training you can export your training model via the "export" button. You'll receive a prompt to select the type of model and the format. I did General Compact and ONNX as that's what's preferred for ML.NET. But select what's best for you use cases. </p>
<p _ngcontent-kgd-c21=""><img src="https://media.calebukle.com/uploads/model-types.png" alt="Modal Export Types" _ngcontent-kgd-c21=""></p>
<p _ngcontent-kgd-c21="">Hopefully this helps out some people who were in the similar situation as me. I hope to be doing more machine learning content in the future. Have a great day 😃!</p>
<!--scullyContent-end--><scully-content _ngcontent-kgd-c21=""></scully-content>
</section>
</body>
</html>
`;


/**
 *
 * @param {string} url
 */
async function download(url) {

  return axios.get(url, {responseType: "arraybuffer"})

  //
  // return new Promise((res, rej) => {
  //   https.get(url, (resp) => {
  //     resp.setEncoding('ArrayBuffer');
  //     let data = '';
  //     resp.on('data', (chunk) => {
  //       data += chunk;
  //     })
  //
  //     resp.on('end', () => {
  //       res(data);
  //     })
  //   })
  //     .on('error', (err) => rej(err))
  // })
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


const script = `
<script>
  const imageWrappers = document.querySelectorAll('.img-wrapper')

  for (let i = 0; i < imageWrappers.length; i++) {
    const imgWrap = imageWrappers[i];

    const imgEl = imgWrap.querySelector('img');

    const onImageComplete = () => {
      imgEl.style.opacity = 1;
      imgEl.style.filter = null;
      imgEl.style.color = 'inherit';
      imgEl.style.boxShadow = 'inset 0 0 0 400px white'
      imgEl.removeEventListener('load', onImageLoad)
      imgEl.removeEventListener('error', onImageComplete)
    }

    const onImageLoad = () => {
      imgEl.style.transition = 'opacity .4s cubic-bezier(0.4, 0.0, 0.2, 1)';

      onImageComplete()
    }

    imgEl.style.opacity = 0;
    imgEl.style.filter = 'blur(50px)';
    imgEl.style.transform = 'scale(1)';
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
  const {window} = dom
  const imgs = window.document.querySelectorAll('img');

  console.log(imgs.length);
  for (let i = 0; i < imgs.length; i++) {

    const mediaUrl = imgs[i].src;
    const caption = imgs[i].alt || 'Media by Caleb Ukle';
    console.log(mediaUrl, caption);
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

  window.document.body.insertAdjacentHTML("afterend", script);
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
