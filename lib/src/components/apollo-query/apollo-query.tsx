import { Component, Prop, State, Element, Watch, Event, EventEmitter } from "@stencil/core";
import { DocumentNode } from "graphql";
import { QueryResult, QueryRenderer } from "../../utils/types";
import { ApolloClient, WatchQueryOptions, NetworkStatus } from "apollo-client";
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-query'
})
export class ApolloQueryComponent {
  @Prop() query: DocumentNode;
  @Prop() renderer: QueryRenderer<any>;
  @Prop() variables: any;
  @Prop() options: WatchQueryOptions;
  @State() result: QueryResult<any>
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
  startSubscription(){
    if (this.client) {
      const observable = this.client.watchQuery({
        query: this.query,
        variables: this.variables,
        ...this.options
      });
      this.result = {
        data: undefined,
        loading: true,
        error: undefined,
        variables: this.variables,
        networkStatus: undefined,
        refetch: observable.refetch.bind(observable),
        fetchMore: observable.fetchMore.bind(observable),
        startPolling: observable.startPolling.bind(observable),
        stopPolling: observable.stopPolling.bind(observable),
        subscribeToMore: observable.subscribeToMore.bind(observable),
        updateQuery: observable.updateQuery.bind(observable),
        client: this.client,
      };
      this._subscription = observable.subscribe(queryResult => {
        const {
          data,
          loading,
          errors,
          networkStatus,
        } = queryResult;
        this.result = {
          data,
          loading,
          error: {
            graphQLErrors: errors,
            networkError: undefined,
            message: errors && errors[0].message,
            name: errors && errors[0].name,
            extraInfo: errors && errors[0],
          },
          variables: this.variables,
          networkStatus,
          refetch: observable.refetch.bind(observable),
          fetchMore: observable.fetchMore.bind(observable),
          startPolling: observable.startPolling.bind(observable),
          stopPolling: observable.stopPolling.bind(observable),
          subscribeToMore: observable.subscribeToMore.bind(observable),
          updateQuery: observable.updateQuery.bind(observable),
          client: this.client,
        };
        this.resultEventEmitter.emit(this.result);
      }, error => {
        this.result = {
          data: undefined,
          loading: false,
          error,
          variables: this.variables,
          networkStatus: NetworkStatus.error,
          refetch: observable.refetch.bind(observable),
          fetchMore: observable.fetchMore.bind(observable),
          startPolling: observable.startPolling.bind(observable),
          stopPolling: observable.stopPolling.bind(observable),
          subscribeToMore: observable.subscribeToMore.bind(observable),
          updateQuery: observable.updateQuery.bind(observable),
          client: this.client,
        };
        this.resultEventEmitter.emit(this.result);
      });
      this.readyEventEmitter.emit(this.result);
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
    return this.renderer && this.renderer(this.result);
  }
}

ApolloProviderProviderConsumer.injectProps(ApolloQueryComponent, ['client']);
