import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-apollo',
  bundles: [
    {
      components: [
        'apollo-provider',
        'apollo-client-controller',
        'apollo-query',
        'apollo-mutation',
        'apollo-subscription'
      ]
    }
  ],
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'docs',
      strict: true
    }
  ]
};
