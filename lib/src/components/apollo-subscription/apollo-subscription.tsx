import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnSubscriptionReadyFn } from "./types";
import { SubscriptionOptions } from "apollo-client";

@Component({
  tag: 'apollo-subscription'
})
export class ApolloQuery {
  @Prop() subscription: DocumentNode;
  @Prop() onReady: OnSubscriptionReadyFn<any>;
  @Prop() variables: any;
  @Prop() options: SubscriptionOptions;
  @Prop({ connect: 'apollo-client-controller'}) apolloProviderCtrlConnector;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  private _subscription: ZenObservable.Subscription;
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
    this._subscription = client.subscribe({
      query: this.subscription,
      variables: this.variables,
      ...this.options
    }).subscribe(result => {
      this.children = this.onReady(result);
    })
  }
  stopSubscription(){
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }
  render(){
    return [
      <slot/>,
      this.children
    ]
  }
}
