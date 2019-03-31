import { DocumentNode } from "graphql";
import { MutationOptions } from "apollo-client";
import { OnMutationReadyFn } from "../components/apollo-mutation/types";

export const Mutation = <TData, TVariables>(
    {
        mutation,
        variables,
        options
    }: {
        mutation: DocumentNode,
        variables: TVariables,
        options: MutationOptions<TVariables>,
        children?: OnMutationReadyFn<TData, TVariables>
    },
    children: [OnMutationReadyFn<TData, TVariables>]
) => <apollo-mutation mutation={mutation} variables={variables} options={options} onReady={children[0]} />;
