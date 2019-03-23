# Stencil Apollo
[![npm version](https://badge.fury.io/js/stencil-apollo.svg)](https://badge.fury.io/js/stencil-apollo)

Stencil-Apollo is a collection of web components built using [Stencil](https://github.com/ionic-team/stencil).

[**Release Blog Post:** Stencil-Apollo - Stencil meets GraphQL](https://medium.com/the-guild/stencil-apollo-stencil-meets-graphql-6fec577ee615)

You can start using it in your existing project like its sibling React-Apollo;

Install it using npm or yarn;
```bash
  $ yarn add stencil-apollo
```

or

```bash
  $ npm i stencil-apollo
```

and don't forget to install other necessary dependencies if you don't have them.

```bash
  $ yarn add graphql @types/graphql graphql-tag apollo-boost
```

Add `esnext.asynciterable` to `compilerOptions.lib` field in `tsconfig.json` to make TypeScript allow GraphQL to use `AsyncIterator`.

```ejson
 {
 ...
  "compilerOptions": {
    "lib": ["dom", "es2017", "esnext.asynciterable"],
  },
  ...
}

```

Then add `stencil-apollo` to your global file which is `src/global/app.ts` by default or your root component file;

```ts
import 'stencil-apollo';
```


Finally you can provide your `ApolloClient` instance on your root component, then use components everywhere in your project;

```tsx
<apollo-provider client={new ApolloClient(...)}>
...
</apollo-provider>
```

```tsx
  <apollo-query query={ gql`query { foo }` } onReady={
    ({ data, loading }) => {
     if (loading) {
      return 'Loading';
     }
     return <p>Foo: {data.foo}</p>;
    }
  } />
```
