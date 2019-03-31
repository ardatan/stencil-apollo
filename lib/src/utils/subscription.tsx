import { DocumentNode } from "graphql";
import { SubscriptionOptions } from "apollo-client";
import { OnSubscriptionReadyFn } from "../components/apollo-subscription/types";

export const Subscription = <TData, TVariables>(
    {
        subscription,
        variables,
        options,
    }: {
        subscription: DocumentNode,
        variables?: TVariables,
        options?: SubscriptionOptions<TVariables>,
        children?: OnSubscriptionReadyFn<TData, TVariables>,
    },
    children: [OnSubscriptionReadyFn<TData, TVariables>]
) =>
    <apollo-subscription subscription={subscription} variables={variables} options={options} onReady={children[0]} />;
