import * as Types from '../../types';

import gql from 'graphql-tag';
import { Component, Prop } from '@stencil/core';
declare global {
  type UpvotePostMutationVariables = {
    postId: Types.Scalars['Int']
  };
  
  
  type UpvotePostMutation = ({ __typename?: 'Mutation' } & { upvotePost: Types.Maybe<({ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'votes'>)> });
  
}

const UpvotePostDocument = gql`
    mutation upvotePost($postId: Int!) {
  upvotePost(postId: $postId) {
    id
    votes
  }
}
    `;

@Component({
    tag: 'apollo-upvote-post'
})
export class UpvotePostComponent {
    @Prop() renderer: import('stencil-apollo').MutationRenderer<UpvotePostMutation, UpvotePostMutationVariables>;
    render() {
        return <apollo-mutation mutation={ UpvotePostDocument } renderer={ this.renderer } />;
    }
}
      