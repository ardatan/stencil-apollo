import { Component, Prop } from "@stencil/core";
import { ApolloClient } from 'apollo-client';
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-provider'
})
export class ApolloProvider {
  @Prop() client: ApolloClient<any>;
  render(){
    return (
      <ApolloProviderProviderConsumer.Provider state={{ client: this.client }}>
        <slot />
      </ApolloProviderProviderConsumer.Provider>
    )
  }
}