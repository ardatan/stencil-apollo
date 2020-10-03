import { h } from '@stencil/core';
import { DocumentNode } from "graphql";
import { MutationOptions } from "@apollo/client/core";
import { MutationRenderer } from "./types";

export const Mutation = <TData, TVariables>(
    {
        mutation,
        variables,
        options
    }: {
        mutation: DocumentNode,
        variables?: TVariables,
        options?: MutationOptions<TData, TVariables>,
        inlist?: MutationRenderer<TData, TVariables>
    },
    children: [MutationRenderer<TData, TVariables>]
) => <apollo-mutation mutation={mutation} variables={variables} options={options} renderer={children[0]} />;
