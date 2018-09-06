import { Component, Prop } from "@stencil/core";
import { ApolloClient } from 'apollo-client';

@Component({
  tag: 'apollo-provider'
})
export class ApolloProvider {
  @Prop({ mutable: true, reflectToAttr: true }) client: ApolloClient<any>;
  @Prop({ connect: 'apollo-client-controller' }) apolloClientCtrl: HTMLApolloClientControllerElement;
  componentDidLoad(){
    this.setClient();
  }
  componentWillUpdate(){
    this.setClient();
  }
  setClient(){
    this.apolloClientCtrl.create(this.client);
  }
  render(){
    return <slot />
  }
}
