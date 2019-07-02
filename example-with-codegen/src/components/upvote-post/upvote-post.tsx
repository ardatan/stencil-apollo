import * as Types from '../../types';

import { DocumentNode } from 'graphql';
import 'stencil-apollo';
import { Component, Prop, h } from '@stencil/core';
export type UpvotePostMutationVariables = {
  postId: Types.Scalars['Int']
};


export type UpvotePostMutation = ({ __typename?: 'Mutation' } & { upvotePost: Types.Maybe<({ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'votes'>)> });


 const UpvotePostDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upvotePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upvotePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"votes"},"arguments":[],"directives":[]}]}}]}}]};

@Component({
    tag: 'apollo-upvote-post'
})
export class UpvotePostComponent {
    @Prop() renderer: import('stencil-apollo').MutationRenderer<UpvotePostMutation, UpvotePostMutationVariables>;
    render() {
        return <apollo-mutation mutation={ UpvotePostDocument } renderer={ this.renderer } />;
    }
}
      