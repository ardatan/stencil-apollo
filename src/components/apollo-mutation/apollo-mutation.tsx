import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";

export type OnMutationReadyFn = (mutationFn: any) => JSX.Element | JSX.Element[] | undefined | null;

@Component({
  tag: 'apollo-mutation'
})
export class ApolloMutation {
  @Prop({ mutable: true, reflectToAttr: true }) mutation: DocumentNode;
  @Prop({ mutable: true, reflectToAttr: true}) onReady: OnMutationReadyFn;
  @Prop({ connect: 'apollo-client-controller'}) apolloProviderCtrlConnector;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  subscription: ZenObservable.Subscription;
  componentDidLoad(){
    this.runMutation();
  }
  componentWillUpdate(){
    this.runMutation();
  }
  async runMutation(){
    const apolloProviderCtrl: HTMLApolloClientControllerElement = await this.apolloProviderCtrlConnector.componentOnReady();
    this.children = this.onReady(args => apolloProviderCtrl.getClient().mutate({
      mutation: this.mutation,
      ...args
    }));
  }
  render(){
    return [
      <slot></slot>,
      this.children
    ]
  }
}
