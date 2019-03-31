import { createProviderConsumer } from '@stencil/state-tunnel';
import { ApolloClient } from 'apollo-client';

export interface ApolloProviderState<TCacheShape> {
    client: ApolloClient<TCacheShape>
}

export const ApolloProviderProviderConsumer = createProviderConsumer<ApolloProviderState<any>>({
    client: undefined
}, (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child}/>); 

export function ApolloProvider<TCacheShape>({ client }: { client: ApolloClient<TCacheShape>}, children: JSX.Element[]){
    return (
        <ApolloProviderProviderConsumer.Provider state={{ client }}>
            {children}
        </ApolloProviderProviderConsumer.Provider>
    );
}
