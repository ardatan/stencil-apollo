import { Component, Method } from "@stencil/core";
import { ApolloClient } from "apollo-client";

@Component({
  tag: 'apollo-client-controller'
})
export class ApolloClientController {
  private client: ApolloClient<any>;
  @Method()
  async create(client: ApolloClient<any>){
    this.client = client;
  }
  @Method()
  async getClient(){
    return this.client;
  }
}
