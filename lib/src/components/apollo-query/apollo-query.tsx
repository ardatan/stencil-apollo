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
    return this.startSubscription();
  }
  componentWillUpdate(){
    this.stopSubscription();
    return this.startSubscription();
  }
  componentDidUnload(){
    return this.stopSubscription();
  }
  startSubscription(){
    let firstResolved = false;
    return new Promise(async (resolve, reject) => {
      try {
        this.stopSubscription();
        this._subscription = this.client.watchQuery({
          query: this.query,
          variables: this.variables,
          ...this.options
        }).subscribe(result => {
          if (!firstResolved) {
            firstResolved = true;
            resolve();
          }
          this.children = this.onReady(result);
        },
        e => {
          if (!firstResolved) {
            firstResolved = true;
            reject(e);
          } else {
            throw e;
          }
        })
      } catch (e) {
        firstResolved = true;
        reject(e);
      }
    });
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