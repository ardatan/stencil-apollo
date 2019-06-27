import { h } from '@stencil/core';
import { ApolloClient } from "apollo-client";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface ApolloClientState<TCacheShape> {
    client: ApolloClient<TCacheShape>;
    children ?: any;
}

export const ApolloProviderConsumer = createProviderConsumer<ApolloClientState<any>>({
    client: undefined,
    children: undefined,
}, (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child}/>); 
