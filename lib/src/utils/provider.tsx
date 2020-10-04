import { h, JSX } from '@stencil/core';
import { ApolloClient } from "@apollo/client/core";
import { ApolloProviderConsumer } from "./apollo-client-state";

export function ApolloProvider<TCacheShape>({ client }: { client: ApolloClient<TCacheShape>, inlist?: JSX.Element | JSX.Element[]}, children: JSX.Element[]){
    return (
        <apollo-provider client={client}>
         {children}
        </apollo-provider>
    );
}

export function ApolloConsumer<TCacheShape>(_props: { inlist: ((client: ApolloClient<TCacheShape>) => JSX.Element | JSX.Element[]) }, children: ((client: ApolloClient<TCacheShape>) => JSX.Element | JSX.Element[])){
    return (
        <ApolloProviderConsumer.Consumer>
            {
                ({ client }) => children[0](client)
            }
        </ApolloProviderConsumer.Consumer>
    )
}
