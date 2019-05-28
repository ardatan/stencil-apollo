import { h } from '@stencil/core';
import { DocumentNode } from "graphql";
import { WatchQueryOptions } from "apollo-client";
import { QueryRenderer } from  "./types";

export const Query = <TData, TVariables>(
    {
        query,
        variables,
        options,
    }: {
        query: DocumentNode,
        variables?: TVariables,
        options?: WatchQueryOptions<TVariables>,
        children?: QueryRenderer<TData, TVariables>,
    },
    children: [QueryRenderer<TData, TVariables>]
) =>
    <apollo-query query={query} variables={variables} options={options} renderer={children[0]} />;
