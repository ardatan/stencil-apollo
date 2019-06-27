import { h } from '@stencil/core';
import { ApolloClient } from "apollo-client";
import { ApolloProviderConsumer } from "./apollo-client-state";

export function ApolloProvider<TCacheShape>({ client }: { client: ApolloClient<TCacheShape>, children?: JSX.Element | JSX.Element[]}, children: JSX.Element[]){
    return (
        <apollo-provider client={client}>
         {children}
        </apollo-provider>
    );
}

export function ApolloConsumer<TCacheShape>(_props: { children: ((client: ApolloClient<TCacheShape>) => JSX.Element | JSX.Element[]) }, children: ((client: ApolloClient<TCacheShape>) => JSX.Element | JSX.Element[])){
    return (
        <ApolloProviderConsumer.Consumer>
            {
                ({ client }) => children[0](client)
            }
        </ApolloProviderConsumer.Consumer>
    )
}
