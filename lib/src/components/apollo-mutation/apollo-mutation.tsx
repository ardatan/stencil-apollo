import { Component, Prop, State, Element } from "@stencil/core";
import { DocumentNode } from "graphql";
import { OnMutationReadyFn } from "./types";
import { ApolloClient, MutationOptions } from "apollo-client";
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-mutation'
})
export class ApolloMutation {
  @Prop() mutation: DocumentNode;
  @Prop() onReady: OnMutationReadyFn;
  @Prop() variables: any;
  @Prop() options: MutationOptions;
  @State() children: JSX.Element | JSX.Element[] | null | undefined;
  @Prop() client: ApolloClient<any>;
  @Element() el: HTMLApolloMutationElement;
  componentWillLoad(){
    return this.passMutation();
  }
  componentWillUpdate(){
    return this.passMutation();
  }
  async passMutation(){
    this.children = this.onReady(args => this.client.mutate<any>({
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

ApolloProviderProviderConsumer.injectProps(ApolloMutation, ['client']);
