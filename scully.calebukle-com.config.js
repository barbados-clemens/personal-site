require("dotenv").config()
require("./plugins/addLinksToHeader.plugin.js")
require("./plugins/updateAlgoliaIndex.plugin.js")
require("./plugins/addPostToFirebase.plugin.js")
exports.config = {
  projectRoot: "./src",
  projectName: "calebukle-com",
  outDir: "./dist/static",
  routes: {
    '/recipe/:recipe': {
      type: 'contentFolder',
      postRenderers: ["addLinksToHeader", "updateAlgoliaIndex"],
      recipe: {
        folder: "./recipe"
      }
    },
    "/blog/:slug": {
      type: "contentFolder",
      postRenderers: ["addLinksToHeader", "updateAlgoliaIndex", "addPostToFirebase"],
      slug: {
        folder: "./blog",
      },
    },
  },
}
