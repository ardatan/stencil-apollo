import { h, Component, Prop } from "@stencil/core";
import { ApolloClient } from '@apollo/client/core';
import { ApolloProviderConsumer } from "../../utils/apollo-client-state";
import { Declarations } from './declarations';

const Provider: any = ApolloProviderConsumer.Provider;
@Component({
  tag: 'apollo-provider'
})
export class ApolloProviderComponent {
  @Prop({ mutable: true }) client: ApolloClient<any>;
  declarations = Declarations;
  render(){
    return (
      <Provider state={{ client: this.client }}>
        <slot />
      </Provider>
    )
  }
}
