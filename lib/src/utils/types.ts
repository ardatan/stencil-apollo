import { ApolloQueryResult, OperationVariables, MutationOptions, ObservableQuery } from "apollo-client";

import { FetchResult } from "apollo-link";

export type QueryResult<TData = {}, TVariables = OperationVariables> = ApolloQueryResult<TData> & ObservableQuery<TData, TVariables>;

export type QueryRenderer<TData = {}, TVariables = OperationVariables> = (result: QueryResult<TData, TVariables>) => JSX.Element | JSX.Element[] | undefined | null;

export type MutationFn<TData = {}, TVariables = OperationVariables> = (options: Partial<MutationOptions<TData, TVariables>>) => Promise<FetchResult<TData>>

export type MutationRenderer<TData = {}, TVariables = OperationVariables> = (mutationFn: MutationFn<TData, TVariables>) => JSX.Element | JSX.Element[] | undefined | null;

export type SubscriptionRenderer<TData = {}, _TVariables = OperationVariables> = (result: TData) => JSX.Element | JSX.Element[] | undefined | null;
