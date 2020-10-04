import { Component, Prop, State, Element, Watch, Event, EventEmitter } from "@stencil/core";
import { DocumentNode } from "graphql";
import { MutationRenderer, MutationFn } from "../../utils/types";
import { ApolloClient, MutationOptions } from "@apollo/client/core";
import { ApolloProviderConsumer } from "../../utils/apollo-client-state";

@Component({
  tag: 'apollo-mutation'
})
export class ApolloMutationComponent {
  @Prop() mutation: DocumentNode;
  @Prop() renderer: MutationRenderer;
  @Prop() variables: any;
  @Prop() options: MutationOptions;
  @State() mutationFn: MutationFn<any, any>;
  @Prop() client: ApolloClient<any>;
  @Element() el: HTMLApolloMutationElement;
  @Event({ eventName: 'ready' }) readyEventEmitter: EventEmitter<MutationFn<any, any>>;

  componentWillLoad(){
    this.passMutation();
  }

  @Watch('client')
  @Watch('mutation')
  @Watch('variables')
  @Watch('renderer')
  @Watch('options')
  onPropsChange(){
    this.passMutation();
  }
  async passMutation(){
    if (this.client) {
      this.mutationFn = args => this.client.mutate<any>({
        mutation: this.mutation,
        variables: this.variables,
        ...this.options,
        ...args
      });
      this.readyEventEmitter.emit(this.mutationFn);
    } else {
      throw new Error('You should wrap your parent component with apollo-provider custom element or ApolloProvider functional component');
    }
  }
  render(){
    return this.renderer && this.renderer(this.mutationFn);
  }
}

ApolloProviderConsumer.injectProps(ApolloMutationComponent, ['client']);
