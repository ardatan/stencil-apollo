import { DocumentNode } from "graphql";
import { SubscriptionOptions } from "apollo-client";
import { SubscriptionRenderer } from  "./types";

export const Subscription = <TData, TVariables>(
    {
        subscription,
        variables,
        options,
    }: {
        subscription: DocumentNode,
        variables?: TVariables,
        options?: SubscriptionOptions<TVariables>,
        children?: SubscriptionRenderer<TData, TVariables>,
    },
    children: [SubscriptionRenderer<TData, TVariables>]
) =>
    <apollo-subscription subscription={subscription} variables={variables} options={options} renderer={children[0]} />;
