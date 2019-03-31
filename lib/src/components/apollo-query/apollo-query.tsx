import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnQueryReadyFn } from "./types";
import { ApolloClient, WatchQueryOptions } from "apollo-client";
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-query'
})
export class ApolloQuery {
  @Prop() query: DocumentNode;
  @Prop() onReady: OnQueryReadyFn<any>;
  @Prop() variables: any;
  @Prop() options: WatchQueryOptions;
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
    this._subscription = this.client.watchQuery({
      query: this.query,
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

ApolloProviderProviderConsumer.injectProps(ApolloQuery, ['client']);