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
  <style>
    html, body {
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
    body {
        height: 100vh;
        display: grid;
        place-content: center;
        background: #222;
        color: #eee;
    }
    p {
    text-align: center;
    }
    a,
    a:visited,
    a:active {
        color: #72BE47;
    }
    a:hover,
    a:focus {
        color: #B4DC9D;
    }
  </style>
  <style>
    body {
      transition: background-color 350ms cubic-bezier(0.4, 0.0, 0.2, 1), color 400ms cubic-bezier(.4, 0,.2,1);
    }
  </style>
</head>
<body>
    <img src="#{MEDIA_URL}" alt="media by Caleb Ukle">
    <p>
        Check out <a href="https://calebukle.com">calebukle.com</a>
    </p>
    <p>
    <a href="https://twitter.com/cu_galaxy" rel="nofollow">
    <svg id="Logo_FIXED" width="24" height="24" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
    <style>.cls-1{fill:none;}.cls-2{fill:#1da1f2;}</style>
    </defs>
    <title>Twitter_Logo_Blue</title>
    <rect class="cls-1" width="400" height="400"/>
    <path class="cls-2"
    d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/>
    </svg>
</a>
</p>
</body>
</html>
`;


const BUCKET_URL = 'https://media.calebukle.com';

export async function handleRequest(event: FetchEvent): Promise<Response> {

  if (event.request.method === 'GET') {
    let response = await serveAsset(event);
    if (response.status > 399) {
      response = new Response(response.statusText, {status: response.status});
    }
    return response;
  } else {
    return new Response('Method not allowed', {status: 405});
  }
  // const url = new URL(request.url);
  // console.log(`${BUCKET_URL}${url.pathname}`);
  // return fetch(`${BUCKET_URL}${url.pathname}`);
  // const headers = {
  //   'Content-Type': 'text/html'
  // };
  //
  // const matchedContent = html.replace('#{MEDIA_URL}', request.url);
  // return new Response(matchedContent, {headers});
}

async function serveAsset(event: FetchEvent) {

  const url = new URL(event.request.url);
  // @ts-ignore
  const cache = caches.default;
  let response = await cache.match(event.request);

  if (!response) {
    const mediaUrl = `${BUCKET_URL}${url.pathname}`;
    response = await fetch(mediaUrl);
    const headers = {
      'cache-control': 'public, max-age=31557600',
      'Content-Type': 'text/html'
    };
    response = new Response(html.replace(/#{MEDIA_URL}/g, mediaUrl),
      {headers});
    console.log('body', response.body);
    event.waitUntil(cache.put(event.request, response.clone()));
  }
  return response;
}
