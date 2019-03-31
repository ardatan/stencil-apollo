import { DocumentNode } from "graphql";
import { WatchQueryOptions } from "apollo-client";
import { OnQueryReadyFn } from "../components/apollo-query/types";

export const Query = <TData, TVariables>(
    {
        query,
        variables,
        options,
    }: {
        query: DocumentNode,
        variables?: TVariables,
        options?: WatchQueryOptions<TVariables>,
        children?: OnQueryReadyFn<TData, TVariables>,
    },
    children: [OnQueryReadyFn<TData, TVariables>]
) =>
    <apollo-query query={query} variables={variables} options={options} onReady={children[0]} />;
