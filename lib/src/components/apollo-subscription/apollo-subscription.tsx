import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnSubscriptionReadyFn } from "./types";
import { ApolloClient, SubscriptionOptions } from "apollo-client";
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-subscription'
})
export class ApolloSubscription {
  @Prop() subscription: DocumentNode;
  @Prop() onReady: OnSubscriptionReadyFn<any>;
  @Prop() variables: any;
  @Prop() options: SubscriptionOptions;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  @Prop() client: ApolloClient<any>;
  private _subscription: ZenObservable.Subscription;
  componentWillLoad(){
    this.children = this.onReady({
      data: undefined,
      errors: [],
      loading: true,
      networkStatus: undefined,
      stale: undefined
    });
    this.startSubscription();
  }
  componentWillUpdate(){
    this.stopSubscription();
    this.startSubscription();
  }
  componentDidUnload(){
    this.stopSubscription();
  }
  startSubscription(){
    const client = this.client;
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

ApolloProviderProviderConsumer.injectProps(ApolloSubscription, ['client']);