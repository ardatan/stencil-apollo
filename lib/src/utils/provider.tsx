import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import { ApolloClient } from 'apollo-client';

export interface ApolloProviderState<TCacheShape> {
    client: ApolloClient<TCacheShape>;
    children ?: any;
}

export const ApolloProviderProviderConsumer = createProviderConsumer<ApolloProviderState<any>>({
    client: undefined,
    children: undefined,
}, (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child}/>);

export function ApolloProvider<TCacheShape>({ client }: { client: ApolloClient<TCacheShape>, children?: JSX.Element | JSX.Element[]}, children: JSX.Element[]){
    return (
        <apollo-provider client={client}>
         {children}
        </apollo-provider>
    );
}
