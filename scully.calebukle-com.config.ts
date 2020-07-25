import {ScullyConfig, setPluginConfig} from '@scullyio/scully';

setPluginConfig('md', {enableSyntaxHighlighting: true});
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'calebukle-com',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog'
      }
    },
  }
};
