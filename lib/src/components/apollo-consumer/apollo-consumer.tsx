import { Component, Prop, Element } from "@stencil/core";
import { ConsumerRenderer } from "../../utils";
import { ApolloClient } from "@apollo/client/core";
import { ApolloProviderConsumer } from "../../utils/apollo-client-state";

@Component({
    tag: 'apollo-consumer'
})
export class ApolloMutationComponent {
    @Prop() client: ApolloClient<any>;
    @Element() el: HTMLApolloMutationElement;
    @Prop() renderer: ConsumerRenderer;
    render() {
        return this.renderer(this.client);
    }
}

ApolloProviderConsumer.injectProps(ApolloMutationComponent, ['client']);
