import { h } from '@stencil/core';
import { ApolloClient } from "@apollo/client/core";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface ApolloClientState<TCacheShape> {
    client: ApolloClient<TCacheShape>;
    inlist ?: any;
}

export const ApolloProviderConsumer = createProviderConsumer<ApolloClientState<any>>({
    client: undefined,
    inlist: undefined,
}, (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child}/>); 
