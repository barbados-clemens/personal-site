require('./plugins/addLinksToHeader.plugin.js')
require('./plugins/updateAlgoliaIndex.plugin.js');
require('dotenv').config();

exports.config = {
  projectRoot: "./src",
  projectName: "calebukle-com",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: ['addLinksToHeader', 'updateAlgoliaIndex'],
      slug: {
        folder: "./blog"
      }
    },
  }
};
