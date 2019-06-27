import { h, Component, Prop } from "@stencil/core";
import { ApolloClient } from 'apollo-client';
import { ApolloProviderConsumer } from "../../utils/apollo-client-state";
import { Declarations } from './declarations';

@Component({
  tag: 'apollo-provider'
})
export class ApolloProviderComponent {
  @Prop({ mutable: true }) client: ApolloClient<any>;
  declarations = Declarations;
  render(){
    return (
      <ApolloProviderConsumer.Provider state={{ client: this.client }}>
        <slot />
      </ApolloProviderConsumer.Provider>
    )
  }
}
