import { Component, Prop, State, Element, Watch, Event, EventEmitter } from "@stencil/core";
import { DocumentNode } from "graphql";
import { SubscriptionRenderer } from "../../utils/types";
import { ApolloClient, SubscriptionOptions } from "apollo-client";
import { ApolloProviderProviderConsumer } from "../../utils/provider";

@Component({
  tag: 'apollo-subscription'
})
export class ApolloSubscriptionComponent {
  @Prop() subscription: DocumentNode;
  @Prop() renderer: SubscriptionRenderer<any>;
  @Prop() variables: any;
  @Prop() options: SubscriptionOptions;
  @State() result: any;
  @Prop() client: ApolloClient<any>;
  @Element() el: HTMLApolloSubscriptionElement;
  @Event({ eventName: 'ready' }) readyEventEmitter: EventEmitter<any>;
  @Event({ eventName: 'result' }) resultEventEmitter: EventEmitter<any>;
  private _subscription: ZenObservable.Subscription;
  componentWillLoad() {
    this.result = {
      data: undefined,
      errors: [],
      loading: true,
      networkStatus: undefined,
      stale: undefined
    };
    this.startSubscription();
  }
  @Watch('client')
  @Watch('subscription')
  @Watch('variables')
  @Watch('renderer')
  @Watch('options')
  onPropsChange() {
    this.stopSubscription();
    this.startSubscription();
  }
  componentDidUnload() {
    this.stopSubscription();
  }
  startSubscription() {
    if (this.client) {
      this._subscription = this.client.subscribe({
        query: this.subscription,
        variables: this.variables,
        ...this.options
      }).subscribe(result => {
        this.result = result;
        this.result.emit(this.result);
      })
      this.readyEventEmitter.emit(this.result);
    } else {
      throw new Error('You should wrap your parent component with apollo-provider custom element or ApolloProvider functional component');
    }
  }
  stopSubscription() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
  render() {
    return this.renderer && this.renderer(this.result);
  }
}

ApolloProviderProviderConsumer.injectProps(ApolloSubscriptionComponent, ['client']);