# apollo-query



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                                                     | Default     |
| ----------- | ----------- | ----------- | ------------------------------------------------------------------------ | ----------- |
| `client`    | --          |             | `ApolloClient<any>`                                                      | `undefined` |
| `options`   | --          |             | `WatchQueryOptions<OperationVariables>`                                  | `undefined` |
| `query`     | `query`     |             | `any`                                                                    | `undefined` |
| `renderer`  | --          |             | `(result: QueryResult<any, OperationVariables>) => Element \| Element[]` | `undefined` |
| `variables` | `variables` |             | `any`                                                                    | `undefined` |


## Events

| Event    | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ready`  |             | `CustomEvent<{ data: any; loading: boolean; error: ApolloError; variables: OperationVariables; networkStatus: NetworkStatus; refetch: (variables?: OperationVariables) => Promise<void>; fetchMore: (fetchMoreOptions: { query?: any; variables?: OperationVariables; updateQuery: Function; }) => Promise<void>; startPolling: (interval: number) => void; stopPolling: () => void; subscribeToMore: (options: { document: any; variables?: OperationVariables; updateQuery?: Function; onError?: Function; }) => () => void; updateQuery: (previousResult: any, options: { variables: OperationVariables; }) => any; client: ApolloClient<any>; }>` |
| `result` |             | `CustomEvent<{ data: any; loading: boolean; error: ApolloError; variables: OperationVariables; networkStatus: NetworkStatus; refetch: (variables?: OperationVariables) => Promise<void>; fetchMore: (fetchMoreOptions: { query?: any; variables?: OperationVariables; updateQuery: Function; }) => Promise<void>; startPolling: (interval: number) => void; stopPolling: () => void; subscribeToMore: (options: { document: any; variables?: OperationVariables; updateQuery?: Function; onError?: Function; }) => () => void; updateQuery: (previousResult: any, options: { variables: OperationVariables; }) => any; client: ApolloClient<any>; }>` |


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
