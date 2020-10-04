# apollo-query



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                                                      | Default     |
| ----------- | ----------- | ----------- | ------------------------------------------------------------------------- | ----------- |
| `client`    | --          |             | `ApolloClient<any>`                                                       | `undefined` |
| `options`   | --          |             | `WatchQueryOptions<Record<string, any>, any>`                             | `undefined` |
| `query`     | --          |             | `DocumentNode`                                                            | `undefined` |
| `renderer`  | --          |             | `(result: QueryResult<any, Record<string, any>>) => Element \| Element[]` | `undefined` |
| `variables` | `variables` |             | `any`                                                                     | `undefined` |


## Events

| Event    | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ready`  |             | `CustomEvent<{ data: any; loading: boolean; error: ApolloError; variables: Record<string, any>; networkStatus: NetworkStatus; refetch: (variables?: Record<string, any>) => Promise<void>; fetchMore: (fetchMoreOptions: { query?: DocumentNode; variables?: Record<string, any>; updateQuery: Function; }) => Promise<void>; startPolling: (interval: number) => void; stopPolling: () => void; subscribeToMore: (options: { document: DocumentNode; variables?: Record<string, any>; updateQuery?: Function; onError?: Function; }) => () => void; updateQuery: (previousResult: any, options: { variables: Record<string, any>; }) => any; client: ApolloClient<any>; }>` |
| `result` |             | `CustomEvent<{ data: any; loading: boolean; error: ApolloError; variables: Record<string, any>; networkStatus: NetworkStatus; refetch: (variables?: Record<string, any>) => Promise<void>; fetchMore: (fetchMoreOptions: { query?: DocumentNode; variables?: Record<string, any>; updateQuery: Function; }) => Promise<void>; startPolling: (interval: number) => void; stopPolling: () => void; subscribeToMore: (options: { document: DocumentNode; variables?: Record<string, any>; updateQuery?: Function; onError?: Function; }) => () => void; updateQuery: (previousResult: any, options: { variables: Record<string, any>; }) => any; client: ApolloClient<any>; }>` |


## Dependencies

### Depends on

- context-consumer

### Graph
```mermaid
graph TD;
  apollo-query --> context-consumer
  style apollo-query fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
