import { Component, Prop, h } from "@stencil/core";
import { ApolloClient } from 'apollo-client';
import { ApolloProviderProviderConsumer } from "../../utils/provider";
import { Declarations } from './declarations';

@Component({
  tag: 'apollo-provider'
})
export class ApolloProviderComponent {
  @Prop({ mutable: true }) client: ApolloClient<any>;
  declarations = Declarations;
  render(){
    return (
      <ApolloProviderProviderConsumer.Provider state={{ client: this.client }}>
        <slot />
      </ApolloProviderProviderConsumer.Provider>
    )
  }
}