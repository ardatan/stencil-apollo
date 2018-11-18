import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnQueryReadyFn } from "./types";

@Component({
  tag: 'apollo-query'
})
export class ApolloQuery {
  @Prop() query: DocumentNode;
  @Prop() onReady: OnQueryReadyFn<any>;
  @Prop() variables: any;
  @Prop({ connect: 'apollo-client-controller'}) apolloProviderCtrlConnector;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  subscription: ZenObservable.Subscription;
  componentWillLoad(){
    return this.startSubscription();
  }
  componentWillUpdate(){
    return this.startSubscription();
  }
  componentDidUnload(){
    return this.stopSubscription();
  }
  async startSubscription(){
    this.stopSubscription();
    const apolloProviderCtrl: HTMLApolloClientControllerElement = await this.apolloProviderCtrlConnector.componentOnReady();
    const client = await apolloProviderCtrl.getClient();
    this.subscription = client.watchQuery({
      query: this.query,
      variables: this.variables
    }).subscribe(result => {
      this.children = this.onReady(result);
    })
  }
  stopSubscription(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  render(){
    return [
      <slot/>,
      this.children
    ]
  }
}
