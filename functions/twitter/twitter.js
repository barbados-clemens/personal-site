// Shamelessly taken from wes bos https://github.com/wesbos/wesbos/blob/master/functions/twitter/twitter.js
const Twitter = require('twitter-lite');

const auth = {
  subdomain: 'api',
  version: '1.1',
  access_token_key: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_SECRET,
  consumer_key: process.env.TWITTER_USER_KEY,
  consumer_secret: process.env.TWITTER_USER_SECRET,
};

const client = new Twitter(auth);

const cache = {
  lastFetch: 0,
  tweets: new Map(),
};


async function getTweets(tags) {
  if (!Array.isArray(tags)) {
    return null;
  }

  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  const key = tags.join(',');

  if (timeSinceLastFetch <= 300000 && cache.tweets.has(key)) {
    // less 5 mins, serve up cache
    return cache.tweets.get(key);
  }
  const tweets = await client.get('statuses/user_timeline', {
    screen_name: 'cu_galaxy',
    exclude_replies: true,
    include_rts: false,
    // we ask for 200, and then only give 5. We have to do this because it includes rts and replies as part of this 200? ?!?!?
    count: 200,
    trim_user: true,
    tweet_mode: 'extended',
  });
  const freshTweets = tweets
    .filter(
      tweet =>
        // not cool enough to have more than 5 RTs or 10 favs. so filtering on #tags
        //     tweet.retweet_count > 5 || tweet.favorite_count > 10
        // tweet.full_text.toLowerCase().includes('#webdev') ||
        // tweet.full_text.toLowerCase().includes('#dev')
        tags.some(t => tweet.full_text.toLowerCase().includes(t))
    )
    .slice(0, 3);
  cache.lastFetch = Date.now();
  cache.tweets.set(key, freshTweets);
  return cache.tweets.get(key);
}

exports.handler = async function (event, context, callback) {
  const tags = event.queryStringParameters.tags.split(',').map(t => `#${t}`)
  const tweets = await getTweets(tags);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tweets),
  });
};
