declare var require;
declare var process;

require('dotenv').config();

import {ScullyConfig, setPluginConfig} from '@scullyio/scully';
import {AddLinksToHeader, HeaderLinksDefaultConfig} from '@barbados-clemens/scully-plugin-header-links';
import {AddPostToFirebase, IFirebasePluginSettings} from '@barbados-clemens/scully-plugin-firebase-likes';
import {IAlgoliaPluginConfig, UpdateAlgoliaIndex} from "@barbados-clemens/scully-plugin-algolia";
// import {BlurUpImages, IBlurUpConfig} from "@barbados-clemens/scully-plugin-blur-up-images";


const firebaseConfig: IFirebasePluginSettings = {
  databaseUrl: 'https://portfolio-82e83.firebaseio.com',
  serviceAccount: JSON.parse(process.env.FIREBASE_CONFIG || '{}'),
  isDryRun: false,
  isDebug: false,
};

const algoliaConfig: IAlgoliaPluginConfig = {
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  appId: process.env.ALGOLIA_APP_ID,
  isDryRun: false,
  indexName: 'blog',
}
//
// const blurUpImgConfg: IBlurUpConfig = {
//   isDebug: true,
// }

// setPluginConfig(BlurUpImages, blurUpImgConfg);
setPluginConfig(UpdateAlgoliaIndex, algoliaConfig);
setPluginConfig(AddPostToFirebase, firebaseConfig);
setPluginConfig('md', {enableSyntaxHighlighting: true});
setPluginConfig(AddLinksToHeader, HeaderLinksDefaultConfig);

const blogPostRenderers = [
  AddLinksToHeader,
  AddPostToFirebase,
  UpdateAlgoliaIndex,
  // BlurUpImages,
];

// if (process.env.NODE_ENV.toLowerCase() === 'production') {
//   const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)
//   setPluginConfig(AddPostaddToFireBase, {
//     credential: serviceAccount,
//     databaseURL: "https://portfolio-82e83.firebaseio.com",
//   })
//   // blogPostRenderers.push(AddPostToFireBase)
//   log(yellow(`Running production plugins`))
// } else {
//   log(yellow(`Not running in production, ${process.env.NODE_ENV || 'NODE_ENV not set'}`))
// }


export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'calebukle-com',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: [...blogPostRenderers],
      slug: {
        folder: './blog'
      }
    },
  }
};
