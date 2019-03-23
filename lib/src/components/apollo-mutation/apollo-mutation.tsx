import { Component, Prop, State } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnMutationReadyFn } from "./types";
import { MutationOptions } from "apollo-client";

@Component({
  tag: 'apollo-mutation'
})
export class ApolloMutation {
  @Prop() mutation: DocumentNode;
  @Prop() onReady: OnMutationReadyFn;
  @Prop() variables: any;
  @Prop() options: MutationOptions;
  @Prop({ connect: 'apollo-client-controller'}) apolloProviderCtrlConnector;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  componentWillLoad(){
    return this.passMutation();
  }
  componentWillUpdate(){
    return this.passMutation();
  }
  async passMutation(){
    const apolloProviderCtrl: HTMLApolloClientControllerElement = await this.apolloProviderCtrlConnector.componentOnReady();
    const client = await apolloProviderCtrl.getClient();
    this.children = this.onReady(args => client.mutate<any>({
      mutation: this.mutation,
      variables: this.variables,
      ...this.options,
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
