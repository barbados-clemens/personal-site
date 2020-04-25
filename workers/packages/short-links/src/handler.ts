export async function handleRequest(request: Request): Promise<Response> {
  const idx = request.url.lastIndexOf('/');
  const key = request.url.substring(idx + 1);
  const url = await getUrl(key);

  // return new Response(JSON.stringify({
  //   idx,
  //   key,
  //   url
  // }), {
  //   headers: {'Content-Type': 'application/json'}
  // });
  return Response.redirect(url, 301);
}

const getUrl = async (key: string) => {

  key = key.toLowerCase();
  const value = await LINKS.get(key);

  return !!value
    ? `${value}?${UTM}&link_kv=hit?key=${key}`
    : `https://calebukle.com/blog?${UTM}&link_kv=miss?key=${key}`;
};

const UTM = 'utm_source=link.calebukle.com';
