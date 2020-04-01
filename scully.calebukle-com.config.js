require("dotenv").config();
require("./plugins/addLinksToHeader.plugin.js");
require("./plugins/updateAlgoliaIndex.plugin.js");
require("./plugins/addPostToFirebase.plugin.js");
require("@notiz/scully-plugin-lazy-images");
// require("@notiz/scully-plugin-fouc");

const {RouteTypes} = require('@scullyio/scully');
const {Sitemap} = require('@gammastream/scully-plugin-sitemap');

const sitemapOptions = {
  urlPrefix: 'https://calebukle.com',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: ['0.7','0.7', '0.7'],
  ignoredRoutes: ['/404', '/contact/thanks', '/contact']
};

exports.config = {
  projectRoot: "./src",
  projectName: "calebukle-com",
  outDir: "./dist/static",
  sitemapOptions,
  defaultPostRenderers: [Sitemap],
  routes: {
    // '/recipe/:recipe': {
    //   type: 'contentFolder',
    //   postRenderers: ["addLinksToHeader", "updateAlgoliaIndex"],
    //   recipe: {
    //     folder: "./recipe"
    //   }
    // },
    "/blog/:slug": {
      type: "contentFolder",
      postRenderers: ["addLinksToHeader", "updateAlgoliaIndex", "addPostToFirebase", Sitemap],
      slug: {
        folder: "./blog",
      },
    },
  },
}
