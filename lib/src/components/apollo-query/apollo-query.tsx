import { Component, Prop, State, Element, Watch, Event, EventEmitter } from "@stencil/core";
import { DocumentNode } from "graphql";
import { QueryRenderer } from "./types";
import { ApolloClient, WatchQueryOptions, ApolloQueryResult } from "apollo-client";
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-query'
})
export class ApolloQueryComponent {
  @Prop() query: DocumentNode;
  @Prop() renderer: QueryRenderer<any>;
  @Prop() variables: any;
  @Prop() options: WatchQueryOptions;
  @State() result: ApolloQueryResult<any>
  @Prop() client: ApolloClient<any>;
  @Element() el: HTMLApolloQueryElement;
  @Event() loaded: EventEmitter;
  private _subscription: ZenObservable.Subscription;
  componentWillLoad(){
    this.result = {
      data: undefined,
      errors: [],
      loading: true,
      networkStatus: undefined,
      stale: undefined
    }
    this.startSubscription();
  }
  @Watch('client')
  @Watch('query')
  @Watch('variables')
  @Watch('renderer')
  @Watch('options')
  onPropsChange(){
    this.stopSubscription();
    this.startSubscription();
  }
  componentDidUnload(){
    this.stopSubscription();
  }
  startSubscription(){
    if (this.client) {
      this._subscription = this.client.watchQuery({
        query: this.query,
        variables: this.variables,
        ...this.options
      }).subscribe(result => {
        this.result = result;
        this.loaded.emit(this.result);
      })
    } else {
      throw new Error('You should wrap your parent component with apollo-provider custom element or ApolloProvider functional component');
    }
  }
  stopSubscription(){
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }
  render(){
    return [
      <slot/>,
      this.renderer && this.renderer(this.result),
    ]
  }
}

ApolloProviderProviderConsumer.injectProps(ApolloQueryComponent, ['client']);