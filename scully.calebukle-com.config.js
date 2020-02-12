exports.config = {
  projectRoot: "./src",
  projectName: "calebukle-com",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};
