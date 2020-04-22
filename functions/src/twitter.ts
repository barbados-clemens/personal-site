// Shamelessly taken from wes bos https://github.com/wesbos/wesbos/blob/master/functions/twitter/twitter.js
const Twitter = require('twitter-lite');

export async function getTopTweets(count: number, authCtx: TwitterAuthContext) {

  const client = new Twitter(authCtx);

  const tweets = await client.get('statuses/user_timeline', {
    screen_name: 'cu_galaxy',
    exclude_replies: true,
    include_rts: false,
    // we ask for 200, and then only give 5. We have to do this because it includes rts and replies as part of this 200? ?!?!?
    count: 200,
    trim_user: true,
    tweet_mode: 'extended',
  });

  // not cool enough to have more than 5 RTs or 10 favs. so filtering on #tags
  //     tweet.retweet_count > 5 || tweet.favorite_count > 10
  console.log(`Found ${tweets.length}. Filtering and grabbing top ${count}`);
  return tweets
    .filter((tweet: { full_text: string; }) =>
      tweet.full_text.toLowerCase().includes('#webdev') ||
      tweet.full_text.toLowerCase().includes('#dev')
    )
    .slice(0, count);
}

export interface TwitterAuthContext {
  subdomain: 'api',
  version: '1.1',
  access_token_key: string; // process.env.TWITTER_TOKEN,
  access_token_secret: string; //process.env.TWITTER_SECRET,
  consumer_key: string; //process.env.TWITTER_USER_KEY,
  consumer_secret: string; //process.env.TWITTER_USER_SECRET,
}
