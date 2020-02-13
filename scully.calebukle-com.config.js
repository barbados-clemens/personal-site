require('./plugins/addLinksToHeader.plugin.js')

exports.config = {
  projectRoot: "./src",
  projectName: "calebukle-com",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      postRenderers: ['addLinksToHeader'],
      slug: {
        folder: "./blog"
      }
    },
  }
};
