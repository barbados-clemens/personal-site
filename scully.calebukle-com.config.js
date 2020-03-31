require("dotenv").config();
require("./plugins/addLinksToHeader.plugin.js");
require("./plugins/updateAlgoliaIndex.plugin.js");
require("./plugins/addPostToFirebase.plugin.js");
require("@notiz/scully-plugin-lazy-images");
require("@notiz/scully-plugin-fouc");


exports.config = {
  projectRoot: "./src",
  projectName: "calebukle-com",
  outDir: "./dist/static",
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
      postRenderers: ["addLinksToHeader", "updateAlgoliaIndex", "addPostToFirebase", "lazyImages", "fouc"],
      slug: {
        folder: "./blog",
      },
    },
  },
}
