import { ApolloClient, OperationVariables, MutationOptions, ApolloError, NetworkStatus } from "apollo-client";

import { FetchResult, DocumentNode } from "apollo-link";

export type QueryResult<TData = {}, TVariables = OperationVariables> = {
    data: TData;
    loading: boolean;
    error: ApolloError;
    variables: TVariables;
    networkStatus: NetworkStatus;
    refetch: (variables?: TVariables) => Promise<void>;
    fetchMore: (fetchMoreOptions: {
        query?: DocumentNode,
        variables?: TVariables,
        updateQuery: Function
    }) => Promise<void>;
    startPolling: (interval: number) => void;
    stopPolling: () => void;
    subscribeToMore: (options: { document: DocumentNode, variables?: TVariables, updateQuery?: Function, onError?: Function}) => () => void;
    updateQuery: (previousResult: TData, options: { variables: TVariables }) => TData;
    client: ApolloClient<any>;
};

export type QueryRenderer<TData = {}, TVariables = OperationVariables> = (result: QueryResult<TData, TVariables>) => Element | Element[] | undefined | null;

export type MutationFn<TData = {}, TVariables = OperationVariables> = (options: Partial<MutationOptions<TData, TVariables>>) => Promise<FetchResult<TData>>

export type MutationRenderer<TData = {}, TVariables = OperationVariables> = (mutationFn: MutationFn<TData, TVariables>) => Element | Element[] | undefined | null;

export type SubscriptionRenderer<TData = {}, _TVariables = OperationVariables> = (result: TData) => Element | Element[] | undefined | null;

export type ConsumerRenderer = (client: ApolloClient<any>) => Element | Element[] | undefined | null;
