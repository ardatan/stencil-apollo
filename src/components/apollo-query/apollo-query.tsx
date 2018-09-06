import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { ApolloQueryResult } from "apollo-client";

export type OnQueryReadyFn<T> = (result: ApolloQueryResult<T>) => JSX.Element | JSX.Element[] | undefined | null;

@Component({
  tag: 'apollo-query'
})
export class ApolloQuery {
  @Prop({ mutable: true, reflectToAttr: true }) query: DocumentNode;
  @Prop({ mutable: true, reflectToAttr: true}) onReady: OnQueryReadyFn<any>;
  @Prop({ connect: 'apollo-client-controller'}) apolloProviderCtrlConnector;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  subscription: ZenObservable.Subscription;
  componentDidLoad(){
    this.startSubscription();
  }
  componentWillUpdate(){
    this.startSubscription();
  }
  componentDidUnload(){
    this.stopSubscription();
  }
  async startSubscription(){
    this.stopSubscription();
    const apolloProviderCtrl: HTMLApolloClientControllerElement = await this.apolloProviderCtrlConnector.componentOnReady();
    this.subscription = apolloProviderCtrl.getClient().watchQuery({
      query: this.query
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
      <slot></slot>,
      this.children
    ]
  }
}
