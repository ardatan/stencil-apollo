import { Config } from '@stencil/core';

export const config: Config = {
  enableCache: false,
  namespace: 'stencil-apollo',
  bundles:[
    {
      components: ['apollo-provider', 'apollo-query', 'apollo-mutation', 'apollo-subscription']
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
