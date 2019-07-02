import * as Types from '../../types';

import { DocumentNode } from 'graphql';
import 'stencil-apollo';
import { Component, Prop, h } from '@stencil/core';
export type AllPostsQueryVariables = {};


export type AllPostsQuery = ({ __typename?: 'Query' } & { posts: Types.Maybe<Array<Types.Maybe<({ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'title' | 'votes'> & { author: Types.Maybe<({ __typename?: 'Author' } & Pick<Types.Author, 'id' | 'firstName' | 'lastName'>)> })>>> });


 const AllPostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allPosts"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"votes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"author"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"firstName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"lastName"},"arguments":[],"directives":[]}]}}]}}]}}]};

@Component({
    tag: 'apollo-all-posts'
})
export class AllPostsComponent {
    @Prop() renderer: import('stencil-apollo').QueryRenderer<AllPostsQuery, AllPostsQueryVariables>;
    render() {
        return <apollo-query query={ AllPostsDocument } renderer={ this.renderer } />;
    }
}
      