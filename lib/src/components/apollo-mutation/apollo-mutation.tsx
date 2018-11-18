import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnMutationReadyFn } from "./types";

@Component({
  tag: 'apollo-mutation'
})
export class ApolloMutation {
  @Prop() mutation: DocumentNode;
  @Prop() onReady: OnMutationReadyFn;
  @Prop({ connect: 'apollo-client-controller'}) apolloProviderCtrlConnector;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  subscription: ZenObservable.Subscription;
  componentWillLoad(){
    return this.runMutation();
  }
  componentWillUpdate(){
    return this.runMutation();
  }
  async runMutation(){
    const apolloProviderCtrl: HTMLApolloClientControllerElement = await this.apolloProviderCtrlConnector.componentOnReady();
    const client = await apolloProviderCtrl.getClient();
    this.children = this.onReady(args => client.mutate({
      mutation: this.mutation,
      ...args
    }));
  }
  render(){
    return [
      <slot/>,
      this.children
    ]
  }
}
