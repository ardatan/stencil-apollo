import { Component, Method } from "@stencil/core";
import { ApolloClient } from "apollo-client";

@Component({
  tag: 'apollo-client-controller'
})
export class ApolloClientController {
  private client: ApolloClient<any>;
  @Method()
  create(client: ApolloClient<any>){
    this.client = client;
  }
  @Method()
  getClient(){
    return this.client;
  }
}
