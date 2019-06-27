import { Component, Prop, State, Element, Watch, Event, EventEmitter } from "@stencil/core";
import { DocumentNode } from "graphql";
import { QueryResult, QueryRenderer } from "../../utils/types";
import { ApolloClient, WatchQueryOptions, ApolloQueryResult, ObservableQuery } from "apollo-client";
import { ApolloProviderConsumer } from "../../utils/apollo-client-state";

@Component({
  tag: 'apollo-query'
})
export class ApolloQueryComponent {
  @Prop() query: DocumentNode;
  @Prop() renderer: QueryRenderer<any>;
  @Prop() variables: any;
  @Prop() options: WatchQueryOptions;
  @State() originalResult: ApolloQueryResult<any>;
  observable: ObservableQuery<any, any>;
  @State() error: Error;
  @Prop() client: ApolloClient<any>;
  @Element() el: HTMLApolloQueryElement;
  @Event({ eventName: 'ready' }) readyEventEmitter: EventEmitter<QueryResult<any>>;
  @Event({ eventName: 'result' }) resultEventEmitter: EventEmitter<QueryResult<any>>;
  private _subscription: ZenObservable.Subscription;
  componentWillLoad(){
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
  getResult() {
    return {
      data: this.originalResult && this.originalResult.data,
      loading: this.originalResult ? this.originalResult.loading : true,
      error: {
        graphQLErrors: this.originalResult && this.originalResult.errors,
        networkError: undefined,
        message: this.originalResult && this.originalResult.errors && this.originalResult.errors[0] && this.originalResult.errors[0].message,
        name: this.originalResult && this.originalResult.errors && this.originalResult.errors[0] && this.originalResult.errors[0].name,
        extraInfo: this.originalResult && this.originalResult.errors && this.originalResult.errors[0] && this.originalResult.errors[0].originalError,
      },
      variables: this.variables,
      networkStatus: this.originalResult && this.originalResult.networkStatus,
      refetch: this.observable && this.observable.refetch.bind(this.observable),
      fetchMore: this.observable && this.observable.fetchMore.bind(this.observable),
      startPolling: this.observable && this.observable.startPolling.bind(this.observable),
      stopPolling: this.observable && this.observable.stopPolling.bind(this.observable),
      subscribeToMore: this.observable && this.observable.subscribeToMore.bind(this.observable),
      updateQuery: this.observable && this.observable.updateQuery.bind(this.observable),
      client: this.client,
    };
  }
  startSubscription(){
    if (this.client) {
      const observable = this.client.watchQuery({
        query: this.query,
        variables: this.variables,
        ...this.options
      });
      this._subscription = observable.subscribe(originalResult => {
        this.originalResult = originalResult;
        this.resultEventEmitter.emit(this.getResult());
      }, error => {
        this.error = error;
        this.resultEventEmitter.emit(this.getResult());
      });
      this.readyEventEmitter.emit(this.getResult());
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
    return this.renderer && this.renderer(this.getResult());
  }
}

ApolloProviderConsumer.injectProps(ApolloQueryComponent, ['client']);
