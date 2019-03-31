import { Config } from '@stencil/core';

export const config: Config = {
  enableCache: false,
  bundles:[
    {
      components: ['my-functional-component', 'apollo-provider', 'apollo-query', 'apollo-mutation', 'apollo-subscription']
    }
  ],
  outputTargets:
  [
    {
      type: 'www',
    }
  ],
  globalScript: "src/global/app.ts"
};
