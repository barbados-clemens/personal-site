require('dotenv').config()
import {log, ScullyConfig, setPluginConfig, yellow} from '@scullyio/scully';
import {AddLinksToHeader, HeaderLinksDefaultConfig} from '@barbados-clemens/scully-plugin-header-links'
import {AddPostToFirebase, IFirebasePluginSettings} from '@barbados-clemens/scully-plugin-firebase-likes';


setPluginConfig('md', {enableSyntaxHighlighting: true});
setPluginConfig(AddLinksToHeader, HeaderLinksDefaultConfig)
const firebaseConfig: IFirebasePluginSettings = {
  databaseUrl: 'https://portfolio-82e83.firebaseio.com',
  serviceAccount: JSON.parse(process.env.FIREBASE_CONFIG),
  dryRun: false,
  debug: true,
}
console.log(firebaseConfig)
setPluginConfig(AddPostToFirebase, firebaseConfig)

const blogPostRenderers = [
  AddLinksToHeader,
  AddPostToFirebase,
]

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
