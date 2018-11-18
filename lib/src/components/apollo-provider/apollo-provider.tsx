import { Component, Prop } from "@stencil/core";
import { ApolloClient } from 'apollo-client';

@Component({
  tag: 'apollo-provider'
})
export class ApolloProvider {
  @Prop() client: ApolloClient<any>;
  @Prop({ connect: 'apollo-client-controller' }) apolloClientCtrl: HTMLApolloClientControllerElement;
  componentWillLoad(){
    return this.setClient();
  }
  componentWillUpdate(){
    return this.setClient();
  }
  setClient(){
    return this.apolloClientCtrl.create(this.client);
  }
  render(){
    return <slot />
  }
}
